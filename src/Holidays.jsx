import React, { useState, useEffect } from 'react';

const Holidays = () => {
  const [holidayData, setHolidayData] = useState([]);
  const [month, setMonth] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  async function getInfo() {
    const url = `https://holidayapi.com/v1/holidays?pretty&country=XK&year=2023&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.holidays);
    setHolidayData(data.holidays);
  }

  useEffect(() => {
    getInfo();
  }, []);

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

  return (
    <div>
      <h1>Official Holidays in Kosovo</h1>
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
