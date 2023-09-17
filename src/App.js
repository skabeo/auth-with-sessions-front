import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedIn('LOGGED_IN')
    setUser(data.user)
  }

  const handleLogout = () => {
    setLoggedIn('NOT_LOGGED_IN')
    setUser(null)
  }

  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get('http://localhost:3000/logged_in', { withCredentials: true }).then(response => {
        if (response.data.logged_in) {
          setLoggedIn('LoggedIn')
          setUser(response.data.user)
        }
      }).catch(err => {
        console.log('checkLoginfail', err)
      })
    }

    checkLoginStatus()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route 
          path='/' 
          element={<Home handleLogin={handleLogin} loggedInStatus={loggedIn} handleLogout={handleLogout} />} 
        />
        <Route 
          path='/dashboard' 
          element={<Dashboard loggedInStatus={loggedIn} user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
