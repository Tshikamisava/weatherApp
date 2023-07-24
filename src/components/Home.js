
import React, { useEffect, useState } from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
    UilClouds,
} from '@iconscout/react-unicons';
import axios from 'axios';

function Home() {
  const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

    const [data, setData] = useState({
        celscius: 10,
        name: 'Pretoria',
        humidity: 10,
        speed: 2,
    });

    const [name, setName] = useState('');
    const [weatherIcon, setWeatherIcon] = useState(null);
   
    
useEffect(()=>{
    const fetchData = async () => {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=05877fcbe40dafae4abb67234760c403&units=metric`;
          const res = await axios.get(apiUrl);
          setData({
            celsius: Math.round(res.data.main.temp),
            name: res.data.name,
            humidity: Math.round(res.data.main.humidity),
            speed: Math.round(res.data.wind.speed),
          });
  
          // Extract weather condition code from response
          const weatherData = res.data.weather && res.data.weather.length > 0 ? res.data.weather[0] : null;
          setWeatherIcon(weatherData?.icon);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, [name]);



const handleClick = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=05877fcbe40dafae4abb67234760c403&units=metric`;
   axios.get(apiUrl).then(res => {
    console.log(res.data)
    setData({...data, celscius: res.data.main.temp, name: res.data.name,
         humidity: res.data.main.humidity, speed: res.data.wind.speed })
   })
    .catch( err => console.log(err));
}

return (
    <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter city name' onChange={(e) => setName(e.target.value)} />
                <button onClick={handleClick}><img src="/images/search.png" alt="" /></button>
            </div>
            <div className='winfo'>
            {weatherIcon && (
            <>
              <img src={makeIconURL(weatherIcon)} alt='Weather Icon' />
              <p></p>
            </>
          )}
                <h1>{Math.round(data.celscius)}&deg;C</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <UilTemperature size={50}/>

                        <div className='humidity'>
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                        
                        </div>
                    </div>

                    <div className="col">
                        <UilWind size={50}/>
                        <div className='wind'>
                        <p>{Math.round(data.speed)}km/h</p>
                        <p>wind</p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;