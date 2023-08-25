import clear from "./assets/clear.jpg";
import cloudy from "./assets/cloudy.jpg";
import rainy from "./assets/rainy.jpg";
import mist from "./assets/mist.jpg";
import cold from "./assets/cold.jpg";
import thunderstorm from "./assets/thunderstorm.jpeg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
// import { BiCloudLightRain } from "react-icons/bi";

function App() {
  const [city, setCity] = useState("Romania");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(clear);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = data.description;
      if (threshold==='clear sky') setBg(clear);
      if (threshold==='few clouds') setBg(cloudy);
      if (threshold==='scattered clouds') setBg(cloudy);
      if (threshold==='broken clouds') setBg(cloudy);
      if (threshold==='shower rain') setBg(rainy);
      if (threshold==='rain') setBg(rainy);
      if (threshold==='thunderstorm') setBg(thunderstorm);
      if (threshold==='snow') setBg(cold);
      if (threshold==='mist') setBg(mist);


      // else setBg(coldBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };


  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

