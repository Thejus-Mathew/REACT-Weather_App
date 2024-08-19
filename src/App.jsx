import './App.css'

function App() {

  return (
    <>
      <div className="main">
        <div className="bg1" style={{backgroundImage: "url(" + "https://static.vecteezy.com/system/resources/previews/002/008/609/non_2x/beautiful-sandy-beach-and-sea-free-photo.jpg" + ")"}}>
          <div className="bg2">
          </div>
        </div>
        <div className="content">
          <input type="text" value={"New York"}/> 
          <h1 className='place'>New York</h1>
          <div className="temp">
            <img src="https://openweathermap.org/img/wn/10n@2x.png" alt="" />
            <span>20 &deg;C</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
