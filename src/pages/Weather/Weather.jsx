import React, { useEffect, useState } from 'react'
import './Weather.css'
import WeatherInfo from './WeatherInfo';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [conLoading, setConLoading] = useState(false);

  const getWeatherData = async({location}) => {
    if(location === '') {
      return alert('location is required, ip not fetched, please reload');
    }
    setWeatherData(null);
    setConLoading(true);
    
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7afae986719f43e0b91135851240406&q=${location}`);
      const data = response.data;
      setWeatherData(data.current);
      // console.log(setWeatherData);
    } catch(err) {
      console.warn(err)
    }
    setConLoading(false);

  }

  useEffect(() => {
    const fetchLocation = async() => {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET'
        })
        const data = response.data;
        setLocation(data.city);
      } catch (err) {
        console.warn(err)
      }
    }
    fetchLocation();
    getWeatherData(location);
  }, [])

  return (
    <div className='weather-container'>
      <h1>Weather</h1>
      <div className='weather-body'>
        {conLoading && <h5>Loading...</h5>}
        {
          weatherData && 
          <div>
            <WeatherInfo data={weatherData} />
          </div>
        }
      </div>
    </div>
  )
}

export default Weather
