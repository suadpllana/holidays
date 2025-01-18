import React, { useState, useEffect } from 'react';

const Holidays = () => {
  const [holidayData, setHolidayData] = useState([]);
  const [countries, setCountries] = useState([])
  const [month, setMonth] = useState("");
  const [country , setCountry] = useState({
    code: "XK",
    countryName: "Kosovo"
  })

  const apiKey = import.meta.env.VITE_API_KEY;


  async function getAllCountries(){
    const url = `https://holidayapi.com/v1/countries?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data.countries)
   
  }
  async function getInfo() {
    const url = `https://holidayapi.com/v1/holidays?pretty&country=${country.code}&year=2024&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
  
    setHolidayData(data.holidays);
  
  }

  useEffect(() => {
    getAllCountries()
    getInfo();
  }, [country]);

  const getMonthName = (date) => {
    const monthMap = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    };
    return monthMap[date] || "";
  };
  const handleCountryChange = (selectedCode) => {
  
    const selectedCountry = countries.find(country => country.code === selectedCode);
    console.log(selectedCountry)
    const countryName = selectedCountry.name;
      setCountry({
        code: selectedCode,
        countryName
      })
  };
  

  return (
    <div>
      <p>Get holidays of: </p>
      <select onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Select a country</option>

        {countries.map(country => (
          <option key={country.code} value={country.code}>{country.name}</option>
        ))}
      </select>
      <h1>Official Holidays in {country.countryName}</h1>
      <div className="container">
        {holidayData.length > 0 ? (
          <>
            {holidayData.map((holiday, index) => (
              <p key={index}>
                <strong>Holiday: </strong>{holiday.name} <br />
                <span>
                  <strong>Date: </strong>
                  {holiday.date.slice(8, 10)} of {getMonthName(holiday.date.slice(5,7))}
                </span>
              </p>
            ))}
          </>
        ) : (
          <p>Loading holidays...</p>
        )}
      </div>
    </div>
  );
};

export default Holidays;
