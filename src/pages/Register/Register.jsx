import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const register = async() => {
        setLoading(true);
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
        localStorage.setItem('user-info', JSON.stringify(result))
        if(result.status === 1) {
            nav('/login')
        } else if(result.status === 0) {
            alert(result.message)
        }
        setLoading(false)
    } 

  return (
    <div className='register-container'>
      {loading ? <p>Loading...</p>: null}
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
      <Link to='/login'>Already have account?</Link>
      <button className="button" onClick={register} >Register</button>
    </div>
  )
}

export default Register
