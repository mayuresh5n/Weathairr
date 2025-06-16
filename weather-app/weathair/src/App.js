import React, { useState } from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [weatherData, setWeatherData] = useState({
    temprature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
  });
  const [error, setError] = useState(undefined);

  const getWeather = async (e) => {
    e.preventDefault();
    const cityValue = e.target.elements.city.value;
    const countryValue = e.target.elements.country.value;

    if (cityValue && countryValue) {
      try {
        const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${APIKEY}&units=metric`,
        );
        const data = await api_call.json();

        if (data.cod === '200') {
          setWeatherData({
            temprature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
          });
          setError('');
        } else {
          setWeatherData({
            temprature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
          });
          setError(data.message || 'City not found.');
        }
      } catch (fetchError) {
        setWeatherData({
          temprature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
        });
        setError('Network error. Please try again.');
      }
    } else {
      setWeatherData({
        temprature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
      });
      setError('Please enter name of City & Country');
    }
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-6 title-container'>
                <Titles />
              </div>
              <div className='col-xs-8 form-container'>
                <Form getWeather={getWeather} />
                <Weather
                  temprature={weatherData.temprature}
                  city={weatherData.city}
                  country={weatherData.country}
                  humidity={weatherData.humidity}
                  description={weatherData.description}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
