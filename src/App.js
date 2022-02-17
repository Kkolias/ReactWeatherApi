import axios from 'axios';
import './App.css';
import Form from './components/Form';
import Loader from './components/Loader';
import React, { useEffect, useState } from 'react'
import Weather from './components/Weather';
import Error from './components/Error';


export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isForecast, setForecast] = useState(false);
  const [locationKey, setLocationKey] = useState("");
  const [locationName, setLocationName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [showError, setErrorMsg] = useState("");
  


  const onSubmit = async (input) => {
    setError(false);
    setForecast(false)
    setLoading(true)

    let locationUrl = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Ak6FclN0CVLAPyBwgJxiFhTeFQLIGIRV&q="
    let locationKeyUrl = locationUrl + input
    
    const res  = await axios.get(locationKeyUrl)
    
    if (!res.data || res.data.length === 0) {
      
      setErrorMsg("No such a location");
      setLoading(false);
      setError(true);
      return;
    }
    
    setLocationName(res.data[0].EnglishName)
    setLocationKey(res.data[0].Key);
   
  }
  useEffect(() => {
      if (!locationKey || locationKey.length === 0) {
        return;
      }
      getWeather();
      setLoading(false)
    }, [locationKey])
    

  const getWeather = async () => {
    const weatherUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"
    const apiKey = "?apikey=Ak6FclN0CVLAPyBwgJxiFhTeFQLIGIRV"
    const totalWeatherUrl = weatherUrl + locationKey + apiKey
    console.log(locationKey)
    const forecastRes = await axios.get(totalWeatherUrl)
    if (!forecastRes.data || forecastRes.data.length === 0) {
      setErrorMsg("Something went wrong, try again later");
      setLoading(false);
      setError(true);
      return;
    }
    setWeatherInfo(JSON.stringify(forecastRes.data.DailyForecasts));
    setForecast(true);
    return;
  }
  
  return (
    <div className='App'>
      <h2 className="Header">Weather Api App</h2>
      
      <Form onSubmit={onSubmit}/>
      {isLoading && <Loader />}
      {isError && <Error showError={showError}/>}
      {isForecast && <Weather weatherInfo={weatherInfo} locationName={locationName}/>} 
      
    </div>
  )
}
