import React from 'react'
import Registration from './auth/Registration'
import { useNavigate } from 'react-router-dom'
import Login from './auth/Login';
import axios from 'axios';

const Home = (props) => {
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    navigate('/dashboard')
  }

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3000/logout", { withCredentials: true })
    .then((res) => {
      props.handleLogout();
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Home</h1>

      <h1>Status {props.loggedInStatus}</h1>
      <button onClick={() => handleLogoutClick()}>Logout</button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  )
}

export default Home