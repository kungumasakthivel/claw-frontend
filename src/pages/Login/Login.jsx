import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const login = async() => {
        setLoading(true);
        let item = {email, password}
        console.warn(item)

        let result = await fetch("https://claw-backend-hrmw.onrender.com/user/login", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })

        result = await result.json();
        console.log(result);
        if(result.status === 1) {
            nav('/home');
        } else if (result.status === 0) {
            alert(result.message);
        }
        localStorage.setItem('token', result.token);
        setLoading(false);
    }
  return (
    <div className='login-container'>
      {loading ? <p>Loading...</p>:null}
      <h1>Login Page</h1>
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
      <Link to='/'>New User Register</Link>
      <button className="button" onClick={login} >Login</button>
    </div>
  )
}

export default Login
