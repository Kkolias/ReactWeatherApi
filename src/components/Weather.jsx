import './Weather.css';

import React, { useEffect, useState } from 'react'

export default function Weather(props) {
    const [temperature, setTemperature] = useState("");
    const [icon, setIcon] = useState("");
    const [phrase, setPhrase] = useState("");

    useEffect(() => {
        if (props.weatherInfo.length === 0) {
            console.log("returna")
            return;
        } 
        let data = JSON.parse(props.weatherInfo)
        console.log(data[0])
        setTemperature(data[0].Temperature.Maximum.Value)
        setIcon(data[0].Day.Icon)
        setPhrase(data[0].Day.IconPhrase)
        
    },[props.weatherInfo])
    

  return (
    <div className='weather-info-container'>
      <h2 className='location'>{props.locationName}</h2>
        <div className='temp'>
          <p>temperature</p>
          {temperature} °F | {Math.round((temperature -32) * 0.5556)} °C
        </div>
    
      <div className='phrase'>{phrase}</div>
    </div>
  )
}
