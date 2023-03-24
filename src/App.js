import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [weather, setWeather] = useState();
  const [loc, setLoc] = useState("İstanbul");
  const lang = navigator.language.split("-")[0];
  
  const getWeatherData = async (loc) =>{
    const key = process.env.REACT_APP_WEATHER_DATA;
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}&lang=${lang}`);    
      setWeather(data);
      console.log(data)
  }
  
  useEffect(()=>{
    loc && getWeatherData(loc)
  },[loc])
  
  return (
    <div className="container">
      <input type="text" placeholder="City" value={loc} onChange={(e)=>{setLoc(e.target.value)}} />
      <div>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Bölge</th>
            <th scope="col">Sıcaklık</th>
            <th scope="col">Min Sıcaklık</th>
            <th scope="col">Max Sıcaklık</th>
            <th scope="col">Nem</th>
            <th scope="col">Rüzgar Hızı</th>
            <th scope="col">Hava Bilgisi</th>


          </tr>
        </thead>
        <tbody>
          {weather ? (
            <tr className="table-success">
              <th scope="row">{weather.name}</th>
              <td>{Math.ceil(weather.main.temp-273.15)} Derece</td>
              <td>{Math.ceil(weather.main.temp_min-273.15)} Derece</td>
              <td>{Math.ceil(weather.main.temp_max-273.15)} Derece</td>
              <td>% {weather.main.humidity}</td>
              <td>{weather.wind.speed} km/s</td>
              <td>{weather.weather.map(data=>data.description)}</td>
            </tr>
          ) : (
            <tr className="table-danger">
              <th scope="row">Veri Bekleniyor</th>
              <td>Veri Bekleniyor</td>
              <td>Veri Bekleniyor</td>
              <td>Veri Bekleniyor</td>
              <td>Veri Bekleniyor</td>
              <td>Veri Bekleniyor</td>
              <td>Veri Bekleniyor</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
