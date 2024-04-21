import { useState, useEffect } from 'react'
import personServices from './services/persons'


const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState('')


  useEffect(() => {
    personServices
      .getAll()
      .then(initialResult => {
        setEntries(initialResult)
      })
  }, [])


  const addToPhonebook = (entry) => {
    const exists = entries.find(e => e.name.toLowerCase() === entry.name.toLowerCase())
    if (exists) {
      const confirm = window.confirm(`${exists.name} is already added to phonebook, replace the old number with a new one?`)
      if (!confirm) return;

      const updatedEntry = {...exists, number: entry.number}
      personServices
        .update(exists.id, updatedEntry) 
        .then(updatedEntry => {
          setEntries(entries.map(n => n.id !== exists.id? n : updatedEntry))
          setName('')
          setNumber('')
          setMessage(`number of ${newName} is changed`)
          setTimeout(() => {
            setMessage(null)
          })
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setMessage(`Information of ${entry.name} has already been removed from server`);
          } else {
          setMessage(`Number of ${entry.name} is changed`)
          setTimeout(() => {
            setMessage(null);
          }, 5000);}
        })
    } else {
      personServices
        .create(entry)
        .then(newEntry => {
          setEntries([...entries, newEntry])
          setName('')
          setNumber('')
          setMessage(`${newEntry.name} added`)
          })
          .catch(error => {
            if (error.response && error.response.data) {
              setMessage(`${error.response.data.error}`);
            } else
            {setMessage(`${entry.name} added`)
            setTimeout(() => {
              setMessage(null);
            }, 5000);}
          })
          
    }
  }


  const deleteEntry = (id) => {
    const entry = entries.find(e => e.id === id)
    const confirm = window.confirm(`Delete ${entry.name}?`)
    if (!confirm) return;
    personServices
      .deletee(id)
      .then(() => {
        setEntries(entries.filter(e => e.id !== id))
        setMessage(`${entry.name} has been deleted`)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setMessage(`${error.response.data.error}`);
        } else
        {setMessage(`${entry.name} has been deleted`)
        setTimeout(() => {
          setMessage(null);
        }, 5000);}
      })
  }


  return (
    <div style={{display: "flex", background: "#ffcbcb", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection:"column"}}>
      <h1>Phonebook</h1>
      <Notification message={message}/>

      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>
      <EntryForm addToPhonebook={addToPhonebook}/>
      <EntryList entries={entries} filterz={filter} deleteEntry={deleteEntry}/>
    </div>
  )
}


const Filter = ({filter, setFilter}) => {  
  return (
    <div className="normal">
    filter shown with: <input  type="text" name="Filter" placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}


function EntryForm ({addToPhonebook}) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')


  const handleSubmission = (event) => {
    event.preventDefault()
    addToPhonebook({name, number})
    setName('')
    setNumber('')
  }

  return <form onSubmit={handleSubmission}>
    <input type="text" name="Name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
    <br />
    <input type="text" name="Number" value={number} placeholder="Phone Number" onChange={(e) => setNumber(e.target.value)} />
    <br />
    <button type="submit">add</button>

  </form>
}


function EntryList ({entries, filterz, deleteEntry}) {
  const filteredEntries = filterz ? entries.filter(e => e.name.toLowerCase().includes(filterz.toLowerCase())) : entries

  return (
    <div style={{display: "flex", background: "#ffcbcb", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection:"column"}}>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredEntries.map((entry, i) => 
          <tr key={i}>
            <td className='normal'>{entry.name}</td>
            <td className='normal'>{entry.number}</td>
            <td><button onClick={() => deleteEntry(entry.id)}>delete</button></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

function Notification ({message}) {
  if (message === '') return null
  return <div className='error'>{message}</div>
}

export default App