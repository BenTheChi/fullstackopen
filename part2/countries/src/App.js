import { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({country}) => {
  const [weather, setWeather] = useState(<div></div>);

  useEffect(()=> {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${country["latlng"][0]}&lon=${country["latlng"][1]}&units=imperial&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data);
        setWeather(
          <div>
            Weather In {country.name.common}<br/>
            Temperature {response.data.current.temp}<br/>
            <img src={`http://openweathermap.org/img/wn/${response.data.current.weather.icon}@2x.png`} alt={response.data.current.weather.description} /><br/>
            Wind {response.data.current.wind_speed}<br/>
          </div>
        )
      })
  })

  return weather;
}

const Capital = ({capital}) => {
  return(
    <li>{capital}</li>
  )
}

const Language = ({language}) => {
  console.log(language);

  return (
    <li>{language}</li>
  )
}

const Country = ({country, single}) => {
  const [details, setDetails] = useState(false);

  useEffect(() => {
    if(single) setDetails(true)
  }, [single])

  const handleClick = () => {
    setDetails(!details);
  }

  if(details){

    let allLanguages = [];

    for(const language in country.languages){
      allLanguages.push(country.languages[language]);
    }

    return (
      <div>
        <h1>{country.name.common}</h1><br/>
        Capital(s): <ul>{country.capital.map( capital => <Capital key={`${capital}-key`} capital={capital}/>)}</ul>
        Area: {country.area}<br/><br/>
        <b>Languages:</b><br/>
        <ul>
          {allLanguages.map( language => <Language key={`${language}-key`} language={language}/>)}
        </ul>
        <h1>{country.flag}</h1>
        <Weather country={country}/>
      </div>
    )
  } else {
    return (
      <li> 
        {country.name.common} 
        <button onClick={handleClick}> Show </button>
      </li>
    )
  }
  
}

const CountriesList = ({countries, filter}) => {
  let filteredCountries = countries.filter( country => {
    return country.name.common.toLowerCase().includes(filter) ? true : false;
  })

  if(filteredCountries.length > 10){
    return (<div>Too many matches.  Specify filter.</div>);
  } else if(filteredCountries.length === 1){
    const country = filteredCountries[0];
    return (
      <Country country={country} single={true}/>
    )
  } else if(filteredCountries.length < 10){
    return(
      <ul>
        {filteredCountries.map( country => <Country key={`${country.name.common}-key`} country={country} single={false}/>)}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data);
      })
  }

  const filterCountries = event => {
    setFilter(event.target.value.toLowerCase());
  }

  useEffect(hook, [])

  return (

    <div>
      find countries <input onChange={filterCountries}/>
      <CountriesList countries={countries} filter={filter}/>
    </div>
  )
}

export default App