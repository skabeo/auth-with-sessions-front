import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginErrors: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/sessions", {
      user: {
        email: formData.email,
        password: formData.password,
      }
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log(error)
    })

    setFormData({
      email: '',
      password: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Login;
