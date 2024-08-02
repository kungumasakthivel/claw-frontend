import React, { useEffect, useState } from 'react'
import './Weather.css'
import WeatherInfo from './WeatherInfo';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [conLoading, setConLoading] = useState(false);

  const handleSearch = async() => {
        if(location === '') return ;
        setWeatherData(null);
        setConLoading(true);
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=7afae986719f43e0b91135851240406&q=${location}`);
            const data = response.data;
            // setLocData(data.location)
            setWeatherData(data.current);
        } catch (e) {
            console.error('Error:', e);
        }
        setConLoading(false);
    };

  useEffect(() => {
    const fetchLocation = async() => {
      try {
        const response = await axios.get('https://ipapi.co/json/')
        const data = response.data;
        setLocation(data.city);
      } catch (err) {
        console.warn(err)
      }
    }
    fetchLocation();
  }, [])

  return (
    <div className='weather-container'>
      <h1>Weather</h1>
      <div className="input-container">
          <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              // placeholder={locLoading ? 'Loding...':'Enter Location'}
              className="input-location"
          />
          <button onClick={handleSearch}>search</button>
          {/* <p>{locLoding ? 'Loading...' : null}</p> */}
      </div>
      <div className='weather-body'>
        {conLoading && <h5 style={{paddingTop: '10px'}}>Loading...</h5>}
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
