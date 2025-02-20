import React, { useEffect, useRef, useState } from 'react'
import styles from './Weather.module.css'
import { getImageUrl } from '../utils'
export const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)
  
  const allIcons = {
    "01d": "./clear.png",
    "01n": "./clear.png",
    "02d": "./cloud.png",
    "02n": "./cloud.png",
    "03d": "./cloud.png",
    "03n": "./cloud.png",
    "04d": "./drizzle.png",
    "04n": "./drizzle.png",
    "09d": "./rain.png",
    "09n": "./rain.png",
    "09n": "./rain.png",
    "10d": "./rain.png",
    "10n": "./rain.png",
    "13d": "./snow.png",
    "13n": "./snow.png",
  }
  const search = async (city) => {
    if (city === ""){
      alert("Enter City Name");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || "./clear.png"
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      
    }  catch(error){
        setWeatherData(false)
        console.error('An error occurred:', error);
        alert('Failed to load weather data. Please try again later.');
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.searchBar}>
          <input ref={inputRef} type="text" placeholder='Search' onKeyDown={(event) => {event.key==="Enter" && search(inputRef.current.value)}}/>
          <img src={getImageUrl("./search.png")} alt="" onClick={()=>{search(inputRef.current.value)}}/>
        </div>
        {weatherData?
        <>
          <div className={styles.weatherData}>
            <img src={getImageUrl(weatherData.icon)} alt="" className={styles.weatherIcon}/>
            <p className={styles.temperature}>{weatherData.temperature}°C</p>
            <p className={styles.location}>{weatherData.location}</p>
          </div>
          <div className={styles.additionalData}>
            <div className={styles.col}>
              <img src={getImageUrl("./humidity.png")} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className={styles.col}>
              <img src={getImageUrl("./wind.png")} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
        :<></>}
      </div>
    </div>
  )
}
