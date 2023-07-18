// https://api.openweathermap.org/data/2.5/weather?q=bilaspur&appid=7b66f3c74ef0ad708b9fa6fab6c298c6

import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {
 const[searchValue, setSearchValue] = useState("bilaspur")
const [tempInfo, setTempInfo] = useState("")

 const getWeatherInfo = async()=>{ 
    try {
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7b66f3c74ef0ad708b9fa6fab6c298c6` 

     const res = await fetch(url);
     const data = await res.json()
     const {temp , humidity, pressure} = data.main;
     const {main: weathermood} = data.weather[0]
     const {name} = data
     const {speed} = data.wind
     const {country, sunset}= data.sys
     
     const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
     }

     setTempInfo(myNewWeatherInfo)
     
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(() => {
    getWeatherInfo()
 }, [])
 

  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type="search" placeholder='search...'
            autoFocus
            id= "search"
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            />
            <button className='searchButton' type='button' onClick={getWeatherInfo}>
                Search
            </button>
        </div>
    </div>

      {/* our Temp card */}
      <Weathercard tempInfo = {tempInfo}/>
  
    </>
  )
}

export default Temp