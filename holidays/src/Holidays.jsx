import React from 'react'
import {useState , useEffect} from "react"
const Holidays = () => {
    const [holidayData , setHolidayData] = useState([])

    async function getInfo(){
        const url = "https://holidayapi.com/v1/holidays?pretty&country=XK&year=2023&key=01cc6439-8444-4ad0-b648-f53015996c6d"
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.holidays)
        setHolidayData(data.holidays)
    }

    useEffect(()=>{
        getInfo()
    },[])

  return (
    <div>
      <h1>Official Holidays in Kosovo</h1>
      <div className="container">
        <p>NOTE: DATES ARE US FORMATTED</p>
    {holidayData.length > 0 ? <>
                        {holidayData.map((holiday,index) => (
                            <p key={index}> <strong>Holiday: </strong>{holiday.name} <br /><span><strong>Date: </strong>{holiday.date.slice(5,10)}</span></p>
                        ))}    
                        </> :<></>}
      </div>
    </div>
  )
}

export default Holidays
