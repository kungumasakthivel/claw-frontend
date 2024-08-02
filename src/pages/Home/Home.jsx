import React, { useState, useEffect } from 'react'
import './Home.css'
import Weather from '../Weather/Weather'
import Crud from '../CRUD/Crud'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function HomeEle({display}) {
    if(display) {
        return (
            <div className='home-container'>
            <h1>Home</h1>
            <div className="body-container">
                <Weather/>
                <Crud />
                {console.log('HomeEle')}
            </div>
            </div>
        )
    }
}

const Home = () => {

    const [isAuth, setIsAuth] = useState(false)
    const nav = useNavigate()

    const verifyToken = async(token) => {
        try {
            const result = await fetch('https://claw-backend-hrmw.onrender.com/crud', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            const responce = await result.json();
            console.log(responce);
            if(responce.message === 'jwt must be provided') {
                nav('/login');
            }
            if(responce.status === 2) {
                nav('/login');
            } else if(responce.status === 1) {
                setIsAuth(true);
            }
        } catch (err) {
            alert(err);
            setIsAuth(false);
        }
    }

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);
  
  return (
    <HomeEle display={isAuth} />
  )
}

export default Home
