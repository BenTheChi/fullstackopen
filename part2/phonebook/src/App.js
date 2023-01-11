import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const DeleteButton = ({id, handleDelete}) => {
  return (
    <button onClick={() => handleDelete(id)}>delete</button>
  )
}

const Filter = ({filterContacts}) => {
  return(
    <input onChange={filterContacts}/>
  )
}

const Person = ({person}) => {
  return (
    <>{person.name}: {person.number}</>
  )
}

const Persons = ({filteredPersons, handleDelete}) => {
  return (
    filteredPersons.map( person => 
      <div key={person.id}>
      <Person person={person}/> <DeleteButton id={person.id} handleDelete={handleDelete}/>
      </div>
    )
  )
}

const Notification = ({ message, type }) => {
  let style;

  if(type === 'success'){
    style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  } else {
    style = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  }

  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  const getHook = () => {
    personsService.getAll().then(data => {
      setPersons(data);
      setFilteredPersons(data);
    });
  }
  
  const handleNewNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNewnumberChange = event => {
    setnewNumber(event.target.value);
  }

  const handleDelete = (id) => {
    personsService.del(id).then(delData => {
      getHook();
    })
  }

  useEffect(getHook, [])

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
        exists = true;

        if(person.number !== newNumber){
          if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
            personsService.update(person.id, {name: person.name, number: newNumber}).then(data => {
              getHook();
              setNotification(
                `${person.name}'s number updated to ${newNumber}`
              )
              setNotificationType('success');
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            }).catch( error => {
              if(error.message === 'Request failed with status code 404'){
                setNotification(
                  `Information for ${person.name}'s has already been removed from the server`
                )
                setNotificationType('error');
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              }
            })
          }
        }
      }
    })

    if(!exists){
      let newPerson = {name: newName, number: newNumber};
      
      //Add to DB
      personsService.create(newPerson).then(data => {
        setPersons(persons.concat(data));
        setFilteredPersons(persons.concat(data));
        setNotification(
          `${newName}'s number added to phonebook`
        )
        setNotificationType('success');
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('');
        setnewNumber('');
      });
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      filter shown with <Filter filterContacts={filterContacts}/>
      <h3>Add a New Contact</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewnumberChange={handleNewnumberChange} addName={addName}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />

        
    </div>
  )
}

export default App