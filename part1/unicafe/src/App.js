import { useState } from 'react'

const Button = ({name, handleClick}) => (
  <button onClick={handleClick}>
    {name}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <>
    <tr><td>{text}:</td><td>{value}</td></tr>
    </>
  )
}

const Statistics = ({good, bad, neutral}) => {
  let all = good + bad + neutral;
  let avg = (good + neutral + bad)/3;
  let posPercent = (good / (bad + neutral))*100;

  if(all === 0){
    return(
      <div>
        No Feedback Given
      </div>
    )
  }

  if(good === 0){
    posPercent = 0;
  } if(bad + neutral === 0){
    posPercent = 100;
  }

  return (
    <table>
      <tbody>
      <StatisticsLine text={"Good"} value={good}/>
      <StatisticsLine text={"Neutral"} value={neutral}/>
      <StatisticsLine text={"Bad"} value={bad}/>
      <StatisticsLine text={"All"} value={all}/>
      <StatisticsLine text={"Average"} value={avg}/>
      <StatisticsLine text={"Positive%"} value={posPercent}/>
      </tbody>
    </table>
  )
}


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = name => {
    const handler = () => {
      if(name === 'good'){
        setGood(good+1);
      } else if(name === 'neutral'){
        setNeutral(neutral+1);
      } else if(name === 'bad') {
        setBad(bad+1);
      }
    }

    return handler;
  }

  return (
    <div>
      <b>Give Feedback</b>
      <br />
      <Button name='good' handleClick={handleClick('good')} />
      <Button name='neutral' handleClick={handleClick('neutral')}/>
      <Button name='bad' handleClick={handleClick('bad')}/><br />
      <b>Statistics</b> <br />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App