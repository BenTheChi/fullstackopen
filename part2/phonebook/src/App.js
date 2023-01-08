import { useState } from 'react'

const PersonForm = ({newName, newPhone, handleNewNameChange, handleNewPhoneChange, addName}) => {
  return (
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNewNameChange}/>
    </div>
    <div>
      number: <input value={newPhone} onChange={handleNewPhoneChange}/>
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
    <div>{person.name}: {person.phone}</div>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '12345678', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNewPhoneChange = event => {
    setNewPhone(event.target.value);
  }

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
      let newArray = persons.concat({name: newName, phone: newPhone});
      setPersons(newArray);
      setFilteredPersons(newArray);
      setNewName('');
      setNewPhone('');
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <Filter filterContacts={filterContacts}/>
      <h3>Add a New Contact</h3>
      <PersonForm newName={newName} newPhone={newPhone} handleNewNameChange={handleNewNameChange} handleNewPhoneChange={handleNewPhoneChange} addName={addName}/>
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} />

        
    </div>
  )
}

export default App