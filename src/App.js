import React, { useState, useEffect } from 'react'
import './App.css'
import periodicTableData from './data/PeriodicTableJSON.json'

const App = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstNameSymbol, setFirstNameSymbol] = useState('')
  const [lastNameSymbol, setLastNameSymbol] = useState('')
  const [firstNameBeginning, setFirstNameBeginning] = useState('')
  const [firstNameEnding, setFirstNameEnding] = useState('')
  const [lastNameBeginning, setLastNameBeginning] = useState('')
  const [lastNameEnding, setLastNameEnding] = useState('')
  const [showElements, setShowElements] = useState(false)

  useEffect(() => {
    // Fetch data from JSON file and set it to periodicTable state
    setPeriodicTable(periodicTableData)
  }, [])

  const [periodicTable, setPeriodicTable] = useState([])

  const handleNameChange = (
    e,
    setterFunction,
    setSymbol,
    setBeginning,
    setEnding
  ) => {
    const value = e.target.value
    setterFunction(value)
    setShowElements(false)

    if (value !== '') {
      // Find matching element symbol in the name
      for (let i = 0; i < value.length; i++) {
        const symbolPrefix = value.substring(i, i + 2) // Check for two-character symbol
        const symbolSingle = value.substring(i, i + 1) // Check for single-character symbol

        if (
          periodicTable.some(
            (element) =>
              element.symbol.toLowerCase() === symbolPrefix.toLowerCase()
          )
        ) {
          setSymbol(symbolPrefix)
          setBeginning(value.substring(0, i)) // Set the beginning of the word
          setEnding(value.substring(i + 2)) // Set the remainder of the word
          return // Exit loop if match found
        } else if (
          periodicTable.some(
            (element) =>
              element.symbol.toLowerCase() === symbolSingle.toLowerCase()
          )
        ) {
          setSymbol(symbolSingle)
          setBeginning(value.substring(0, i)) // Set the beginning of the word
          setEnding(value.substring(i + 1)) // Set the remainder of the word
          return // Exit loop if match found
        }
      }
      // No matching element found
      setSymbol('')
      setBeginning('')
      setEnding('')
    } else {
      setSymbol('')
      setBeginning('')
      setEnding('')
    }
  }

  const handleFormSubmit = () => {
    setShowElements(true)
  }

  return (
    <div className='App'>
      <div className='container'>
        {showElements
          ? (
          <div className='name-container'>
            <div className='name-section'>
              {firstNameBeginning && (
                <span className='beginning'>{firstNameBeginning}</span>
              )}
              {firstNameSymbol && (
                <span className='highlight'>{firstNameSymbol}</span>
              )}
              {firstNameEnding && (
                <span className='ending'>{firstNameEnding}</span>
              )}
            </div>
            <div className='name-section'>
              {lastNameBeginning && (
                <span className='beginning'>{lastNameBeginning}</span>
              )}
              {lastNameSymbol && (
                <span className='highlight'>{lastNameSymbol}</span>
              )}
              {lastNameEnding && (
                <span className='ending'>{lastNameEnding}</span>
              )}
            </div>
          </div>
            )
          : (
          <div className='name-container'>
            <div className='name-section'>{firstName}</div>
            <div className='name-section'>{lastName}</div>
          </div>
            )}

        <div className='input-container'>
          <div className='input-field'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) =>
                handleNameChange(
                  e,
                  setFirstName,
                  setFirstNameSymbol,
                  setFirstNameBeginning,
                  setFirstNameEnding
                )
              }
            />
          </div>
          <div className='input-field'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) =>
                handleNameChange(
                  e,
                  setLastName,
                  setLastNameSymbol,
                  setLastNameBeginning,
                  setLastNameEnding
                )
              }
            />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={handleFormSubmit}>Breakify</button>
        </div>
      </div>
    </div>
  )
}

export default App
