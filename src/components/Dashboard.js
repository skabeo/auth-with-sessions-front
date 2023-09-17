import React from 'react'

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Status {props.loggedInStatus}</h1>
      <pre>{props.user.name}</pre>
    </div>
  )
}

export default Dashboard