import React, { useState, useEffect } from 'react';
import '../CSS/Dashboard.css';
import {
  FaHome,
  FaSeedling,
  FaChartLine,
  FaWater,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaCalendarAlt,
  FaCloudSun,
  FaTemperatureHigh,
  FaWind,
  FaMicroscope
} from 'react-icons/fa';
import { TbPlant2 } from 'react-icons/tb'; 



import { GiPlantSeed } from 'react-icons/gi';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const API_KEY = 'cfbd603368ff1383f191a07dece75843';
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Weather API error:", error);
      }
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            fetchWeather(28.6139, 77.2090); 
          }
        );
      } else {
        console.error("Geolocation not supported");
        fetchWeather(28.6139, 77.2090);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  const motivationQuotes = {
    1: "Success in farming doesn't come from luck but from consistent effort, patience, and respect for nature.",
    2: "Each sunrise brings new hope — nurture your land with love and your harvest will thank you in abundance.",
    3: "The soil remembers every act of care; plant with purpose, and your fields will grow with pride.",
    4: "Behind every golden grain is a story of sweat, resilience, and a dream rooted in the earth.",
    5: "True farmers don’t just grow crops, they grow a future full of nourishment, sustainability, and hope.",
    6: "Every drop you save today waters not just the crop, but the legacy of generations to come.",
    7: "Sow with faith, tend with passion, and harvest with humility — that is the way of the wise grower.",
    8: "Farming teaches us that growth doesn’t happen overnight — it rewards those who stay committed.",
    9: "Even when the skies are grey, remember that every great harvest began with a single planted seed.",
    10: "You are not just a farmer, you are a provider, a nurturer, and a silent hero of the land."
  };
  

  const getRandomQuote = () => {
    const keys = Object.keys(motivationQuotes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return motivationQuotes[randomKey];
  };

  const [dailyQuote] = useState(getRandomQuote());

  const day = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' });
  const date = currentDateTime.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const time = currentDateTime.toLocaleTimeString('en-US');

  return (
    <div className="dashboard-container">
   
      <nav className="sidebar">
        <h1>Dashboard</h1>
        <a href="/dashboard"><FaHome /> Home</a>
        <a href="/settings"><FaCog /> Settings</a>
        <a href="/"><FaSignOutAlt /> Logout</a>
      </nav>

     
      <div className="welcome-container">
        <div className="info-boxes">
          
          <div className="date-box">
            <FaCalendarAlt className="calendar-icon" />
            <div className="date-details">
              <h3>{day}</h3>
              <p>{date}</p>
              <p>{time}</p>
            </div>
          </div>

          
          {weatherData && (
            <div className="weather-box">
              <FaCloudSun className="weather-icon" />
              <div className="weather-details">
                <h3>{weatherData.name}</h3>
                <p><FaTemperatureHigh /> Temp: {Math.round(weatherData.main.temp)}°C</p>
                <p><FaWind /> Wind: {weatherData.wind.speed} m/s</p>
                <p>Condition: {weatherData.weather[0].description}</p>
              </div>
            </div>
          )}

          <div className="motivation-box">
            <FaUserCircle className="motivation-icon" />
            <div className="motivation-details">
              <h3>Daily Motivation</h3>
              <p>"{dailyQuote}"</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
  <h1>Explore Key Features</h1>
  <div className="big-buttons">
    
    <div className="feature-block">
      <div className="big-button1" onClick={() => navigate('/crop-analysis')}>
        <TbPlant2 size={50} />
        <h2>Crop Prediction</h2>
      </div>
      <p className="feature-subtext">Get the best crop suggestions</p>
    </div>

    <div className="feature-block">
      <div className="big-button2" onClick={() => navigate('/irrigation')}>
        <FaMicroscope size={50} />
        <h2>Disease Detection</h2>
      </div>
      <p className="feature-subtext">Identify plant diseases early</p>
    </div>

    <div className="feature-block">
      <div className="big-button3" onClick={() => navigate('/soil-health')}>
        <FaSeedling size={50} />
        <h2>Soil Health</h2>
      </div>
      <p className="feature-subtext">Analyze and enrich your soil</p>
    </div>

  </div>
</div>


    </div>
  );
};

export default Dashboard;
