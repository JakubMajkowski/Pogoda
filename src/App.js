import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faCloud,
  faCloudSun,
  faCloudMoon,
  faSnowflake,
  faCloudShowersHeavy,
  faBolt,
  faWind
} from '@fortawesome/free-solid-svg-icons';
import './App.scss';

const apiKey = "50012a1be8909cecaf5e2d33e4ff34b4";
const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Gdynia");
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    if (searchCity) {
      setCity(searchCity);
      setSearchCity("");
    }
  };

  useEffect(() => {
    fetch(`${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error("Błąd podczas pobierania danych z API:", error));
  }, [city]);

  if (!weatherData) {
    return <div class="loading">Loading...</div>;
  }

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getWeatherIcon = (iconCode, styles = {}) => {
    switch (iconCode) {
      case "01d":
        return <FontAwesomeIcon icon={faSun} style={styles} />;
      case "02d":
        return <FontAwesomeIcon icon={faCloudSun} style={styles} />;
      case "03d":
        return <FontAwesomeIcon icon={faCloud} style={styles} />;
      case "04d":
        return <FontAwesomeIcon icon={faCloud} style={styles} />;
      case "09d":
        return <FontAwesomeIcon icon={faCloudShowersHeavy} style={styles} />;
      case "10d":
        return <FontAwesomeIcon icon={faCloudSun} style={styles} />;
      case "11d":
        return <FontAwesomeIcon icon={faBolt} style={styles} />;
      case "13d":
        return <FontAwesomeIcon icon={faSnowflake} style={styles} />;
      case "50d":
        return <FontAwesomeIcon icon={faCloudMoon} style={styles} />;
      case "01n":
        return <FontAwesomeIcon icon={faMoon} style={styles} />;
      case "02n":
        return <FontAwesomeIcon icon={faCloudMoon} style={styles} />;
      case "03n":
        return <FontAwesomeIcon icon={faCloud} style={styles} />;
      case "04n":
        return <FontAwesomeIcon icon={faCloud} style={styles} />;
      case "09n":
        return <FontAwesomeIcon icon={faCloudShowersHeavy} style={styles} />;
      case "10n":
        return <FontAwesomeIcon icon={faCloudMoon} style={styles} />;
      case "11n":
        return <FontAwesomeIcon icon={faBolt} style={styles} />;
      case "13n":
        return <FontAwesomeIcon icon={faSnowflake} style={styles} />;
      case "50n":
        return <FontAwesomeIcon icon={faCloud} style={styles} />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-app">
      <div className="top-bar">
        <p id="location">{weatherData.name}</p>
        <p id="date-time">{`${getCurrentDate()} ${getCurrentTime()}`}</p>
      </div>
      <div className="current-weather">
        {getWeatherIcon(weatherData.weather[0].icon, { fontSize: '5rem' })}
        <p id="temperature">{`${Math.floor(weatherData.main.temp)} °C`}</p>
      </div>
      <div className="additional-info">
        <p>{`Temp odczuwalna: `}<strong>{`${Math.floor(weatherData.main.feels_like)} °C`}</strong></p>
        <p>{`Wilgotność: `}<strong>{`${weatherData.main.humidity} %`}</strong></p>
        <p>{`Ciśnienie: `}<strong>{`${weatherData.main.pressure} hPa`}</strong></p>
        <p>{`Prędkość wiatru: `}<strong>{`${weatherData.wind.speed} m/s`}</strong></p>
      </div>
      <div className="search-bar">
          <input
            type="text"
            placeholder="Wyszukaj miasto"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button onClick={handleSearch}>Szukaj</button>
        </div>
      <div className="footer">
        <p>Gdynia Merito Jakub Majkowski 66591</p>
      </div>
    </div>
  );
}

export default App;