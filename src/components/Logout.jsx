import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const nav = useNavigate()

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-info');
        nav('/login')
    }
  return (
    <div>
      <button onClick={logout} className='button'>Logout</button>
    </div>
  )
}

export default Logout
