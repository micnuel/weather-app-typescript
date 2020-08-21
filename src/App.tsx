import React, {useState} from 'react';
import { isWorker } from 'cluster';

const api ={
  key:'33f86b891e795a7d3b6cae5cf46abfe4',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

/* interface Iweather{
  main:[],
  name:string,
} */
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<any>({});

  const Search =(evt:any):void =>{
    if(evt.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setQuery('');
        setWeather(result);
        //console.log(result);
      })

    }
  }
  const dateBuilder = (d:any)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October","November", "December"];

    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={(typeof weather.main !="undefined")? ((weather.main.temp >16)? "app-warm" :"app"):"app"}>
        <main>
          <div className="search-box">
            <input type="text" className="search-bar"
            placeholder="Search..." 
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            onKeyPress={Search}
            />

          </div>

          {(typeof weather.main != "undefined") ? (
            <div>
            <div className="location-box">
              <div className="location"> {weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className = "weather-box">
                <div className ="temp"> {Math.round(weather.main.temp)}°c</div>
                <div className="weather"> {weather.weather[0].main} </div>
                <div className="weather"> {Math.round(weather.main.temp_min)} °C/ {Math.round(weather.main.temp_max)}°C</div>
            </div>
            </div>
            </div>
          ): ('')}
          
        </main>
    </div>
  );
}

export default App;
