import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import clearSky from './Images/clearSky.jpg';

function App() {


  // Date And Time

  var currentdate = new Date();

  function pad(number) {
      return number < 10 ? '0' + number : number;
  }
  
  function formatHour(hour) {
      if (hour === 0) return 12;
      if (hour > 12) return hour - 12;
      return hour;
  }
  
  function getAmPm(hour) {
      return hour >= 12 ? 'PM' : 'AM';
  }
  
  var date = pad(currentdate.getDate());
  var year = currentdate.getFullYear();
  var hours = currentdate.getHours();
  var minutes = pad(currentdate.getMinutes());
  var formattedHour = formatHour(hours);
  var amPm = getAmPm(hours);


  let day = ""
  switch(currentdate.getDay()) {
    case 1:
      day = "Monday"
      break;
    case 2:
      day = "Tuesday"
      break;
    case 3:
      day = "Wednesday"
      break;
    case 4:
      day = "Thursday"
      break;
    case 5:
      day = "Friday"
      break;
    case 6:
      day = "Saturday"
      break;
    case 7:
      day = "Sunday"
      break;
  }

  let month = ""
  switch(currentdate.getMonth()+1) {
    case 1:
      month = "January"
      break
    case 2:
      month = "February"
      break
    case 3:
      month = "March"
      break
    case 4:
      month = "April"
      break
    case 5:
      month = "May"
      break
    case 6:
      month = "June"
      break
    case 7:
      month = "July"
      break
    case 8:
      month = "August"
      break
    case 9:
      month = "September"
      break
    case 10:
      month = "October"
      break
    case 11:
      month = "November"
      break
    case 12:
      month = "December"
      break
  }

  const [disHour,setHour]=useState(formattedHour)
  const [disMin,setMin]=useState(minutes)
  const [disAmPm,setAmPm] = useState(amPm)
  const[disDay,setDay] = useState(day)
  const[disDate,setDate] = useState(date)
  const[disMonth,setMonth] = useState(month)
  const[disYear,setYear] = useState(year)



  // weather data

  const demo = {
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "overcast clouds",
        "icon": "10n"
      }
    ],
    "main": {
      "temp": 20,
      "feels_like": 16.39,
      "humidity": 69
    },
    "wind": {
      "speed": 7.2
    },
    "sys": {
      "country": "US"
    },
    "name": "New York"
  }

  


  const[input,setInput] = useState("")
  const [weatherData, setWeatherData] = useState(demo);

  
  const [background, setBackground] = useState(clearSky);

  useEffect(() => {
    if (weatherData.weather[0].id === 800) {
      setBackground(clearSky);
    }
     else if (weatherData.weather[0].id < 900 && weatherData.weather[0].id >800) {
      setBackground('./src/Images/fullCloud.jpg');
    }
     else if (weatherData.weather[0].id < 600 && weatherData.weather[0].id >499) {
      setBackground('./src/Images/rain.avif');
    }
     else if (weatherData.weather[0].id < 400 && weatherData.weather[0].id > 299) {
      setBackground('./src/Images/shower.jpg');
    }
     else if (weatherData.weather[0].id < 700 && weatherData.weather[0].id > 599) {
      setBackground('./src/Images/snow.jpg');
    }
     else if (weatherData.weather[0].id < 800 && weatherData.weather[0].id > 699) {
      setBackground('./src/Images/mist.jpg');
    }
     else if (weatherData.weather[0].id < 300 && weatherData.weather[0].id > 199) {
      setBackground('./src/Images/thunder.webp');
    }
  }, [weatherData]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=b9b35dd7c967c2a9827580e8c51cbe91&units=metric`
      );
      if (!response.ok) {
        throw error
      }
      const data = await response.json();
      setWeatherData(data);
    } catch {
      alert("City Name not found")
      setInput("")
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };
  

  return (
    <>
      <div className="main">
        <div className="bg1" style={{backgroundImage: `url(${background})`}}>
          <div className="bg2">
          </div>
        </div>
        <div className="content">
          <input type="text" value={input} onKeyDown={handleKeyDown} onChange={(e)=>setInput(e.target.value)} placeholder='Enter City Name eg "New York"'/>
          <button onClick={fetchWeatherData}><i className="fa-solid fa-magnifying-glass"></i></button>
          <h1 className='place'>{weatherData.name}</h1>
          <div className="temp">
            {weatherData.weather[0].main}<img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
            <span>{weatherData.main.temp} &deg;C</span>
          </div>
          <div className="details">
              <div className='time'>{disHour}:{disMin}<span className='AmPm'>{disAmPm}</span></div>
              <div className='date'>{disDay} {disDate} {disMonth} {disYear}</div>
              <div className="additional">
                <span className='add'><i className="fa-solid fa-location-dot"></i>Country: ({weatherData.sys.country})</span>
                <span className='add'><i className="fa-solid fa-wind"></i>Wind: {weatherData.wind.speed}m/s</span>
              </div>
              <div className="additional">
              <span className='add'><i className="fa-solid fa-droplet"></i>Humidity: {weatherData.main.humidity}%</span>
              <span className='add'><i className="fa-solid fa-temperature-three-quarters"></i>Feels Like : {weatherData.main.feels_like}°C</span>
              </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
