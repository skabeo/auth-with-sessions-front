import React, { useState } from 'react'
import axios from 'axios';

const Registration = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    registrationErrors: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/registrations", {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      }
    },
    { withCredentials: true }
    ).then(response => {
      console.log(response)
      if (response.data.status === 'created') {
        props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log(error)
    })

    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
          type='text'
          name='name'
          placeholder='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type='password'
          name='password_confirmation'
          placeholder='Confirm password'
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Registration
