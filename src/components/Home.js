
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

const weatherIcons = {
    '01d': <UilSun size={50} />,
    '01n': <UilSunset size={50} />,
    '02d': <UilClouds size={50} />,
    '02n': <UilClouds size={50} />,
    '03d': <UilClouds size={50} />,
    '03n': <UilClouds size={50} />,
    '04d': <UilClouds size={50} />,
    '04n': <UilClouds size={50} />,
    '09d': <UilTear size={50} />,
    '09n': <UilTear size={50} />,
    '10d': <UilTear size={50} />,
    '10n': <UilTear size={50} />,
    '11d': <UilWind size={50} />,
    '11n': <UilWind size={50} />,
    '13d': <UilSnowflake size={50} />,
    '13n': <UilSnowflake size={50} />,
    '50d': <UilMist size={50} />,
    '50n': <UilMist size={50} />,
  };

function Home() {

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
            {weatherIcon && weatherIcons[weatherIcon] ? (
            <>
              {weatherIcons[weatherIcon]}
              <p>{data.name}</p>
            </>
          ) : null}
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