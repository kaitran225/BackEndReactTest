import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  const testCORS = async () => {
    try {
      setError('')
      const result = await axios.get('https://api.cybriadev.com/api/users')
      const accessToken = result.data.accessToken; // Assuming the access token is returned in the response
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Set the Authorization header for future requests
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  const testAuth = async () => {
    try {
      setError('')
      const loginData = {
        loginIdentifier: "admin",
        password: "adminpass"
      }
      const result = await axios.post('https://api.cybriadev.com/api/auth/login', loginData)
      const accessToken = result.data.accessToken; // Assuming the access token is returned in the response
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Set the Authorization header for future requests
      setResponse(JSON.stringify(result.data, null, 2))
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    }
  }

  return (
    <div className="App">
      <h1>CORS Test App</h1>
      
      <div className="card">
        <button onClick={testCORS}>
          Test GET /api/users
        </button>
        <button onClick={testAuth}>
          Test POST /api/auth/login
        </button>
      </div>

      {error && (
        <div className="error">
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div className="response">
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  )
}

export default App
