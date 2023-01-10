import { useState, useEffect } from 'react'
import axios from 'axios';

const PersonForm = ({newName, newNumber, handleNewNameChange, handleNewnumberChange, addName}) => {
  return (
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNewNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewnumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Filter = ({filterContacts}) => {
  return(
    <input onChange={filterContacts}/>
  )
}

const Person = ({person}) => {
  return (
    <div>{person.name}: {person.number}</div>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    filteredPersons.map( person => 
      <Person key={person.name} person={person}/>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }
  

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNewnumberChange = event => {
    setnewNumber(event.target.value);
  }

  useEffect(hook, [])

  const filterContacts = event => {
    let newFilteredPersons = persons.filter( person => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase()) ? true : false
    });

    setFilteredPersons(newFilteredPersons);
  }

  const addName = (event) => {
    event.preventDefault()
    let exists = false;

    persons.forEach( person => {
      if(person.name === newName){
        alert(`${newName} is already added to the phonebook`);
        exists = true;
      }
    })

    if(!exists){
      let newArray = persons.concat({name: newName, number: newNumber});
      setPersons(newArray);
      setFilteredPersons(newArray);
      setNewName('');
      setnewNumber('');
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <Filter filterContacts={filterContacts}/>
      <h3>Add a New Contact</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewnumberChange={handleNewnumberChange} addName={addName}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />

        
    </div>
  )
}

export default App