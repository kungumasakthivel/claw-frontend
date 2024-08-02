import React from 'react'

const WeatherInfo = ({data}) => {
    if (!data || data.length === 0) {
        return null; // Render nothing if data is not available yet
    }
    const c = data.temp_c;
    const f = data.temp_f;
  return (
    <div>
      <p>C&deg; / F&deg; : {c} / {f}</p>
    </div>
  )
}

export default WeatherInfo
