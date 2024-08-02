import React, { useState } from 'react'
import './Register.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async() => {
        let item = {name, email, password}
        console.warn(item)

        let result = await fetch("https://claw-backend-hrmw.onrender.com/user/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
    } 

  return (
    <div className='register-container'>
      <h1>Register Page</h1>
      <input type="text" value={name} 
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input type="email" value={email} 
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input type="password" value={password} 
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button className="button" onClick={register} >Register</button>
    </div>
  )
}

export default Register
