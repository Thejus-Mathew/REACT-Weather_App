import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';

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
  const[input,setInput] = useState("")
  const [weather, setWeather] = useState(null);

  // weather data 
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=b9b35dd7c967c2a9827580e8c51cbe91'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
      console.log(weatherData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (weatherData) {
      console.log(3,weatherData); // Logs the updated weatherData
    }
  }, [weatherData]);
  

  return (
    <>
      <div className="main">
        <div className="bg1" style={{backgroundImage: "url(" + "/src/Images/clearSky.jpg" + ")"}}>
          <div className="bg2">
          </div>
        </div>
        <div className="content">
          <input type="text" onChange={(e)=>setInput(e.target.value)} placeholder='Enter City Name eg "New York"'/>
          <button onClick={fetchWeatherData}><i className="fa-solid fa-magnifying-glass"></i></button>
          <h1 className='place'>New York</h1>
          <div className="temp">
            <img src="https://openweathermap.org/img/wn/10n@2x.png" alt="" />
            <span>20 &deg;C</span>
          </div>
          <div className="details">
              <div className='time'>{disHour}:{disMin}<span className='AmPm'>{disAmPm}</span></div>
              <div className='date'>{disDay} {disDate} {disMonth} {disYear}</div>
              <div className="additional">
                <span className='add'><i className="fa-solid fa-location-dot"></i>Country: (US)</span>
                <span className='add'><i className="fa-solid fa-wind"></i>Wind: 1.65km/h</span>
              </div>
              <div className="additional">
              <span className='add'><i className="fa-solid fa-droplet"></i>Humidity: 88%</span>
              <span className='add'><i className="fa-solid fa-temperature-three-quarters"></i>Feels Like : 25°C</span>
              </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
