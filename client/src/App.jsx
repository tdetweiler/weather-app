import React, { useState } from 'react';
import { css } from '@emotion/react';
import sample from 'lodash.sample';
import ClipLoader from 'react-spinners/ClipLoader';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import WeatherGif from './components/WeatherGif';
import weatherGifs from './constants';
import './App.css';

// Demo url and local
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://video-browser-304606.uc.r.appspot.com/v1'
  : 'http://localhost:8000/v1';

function App() {
  const [location, setLocation] = useState('');
  const [weatherError, setWeatherError] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherGif, setWeatherGif] = useState('');
  const [loading, setLoading] = useState(false);

  const onLocationSubmit = async (newLocation) => {
    setCurrentWeather(null);
    setLocation('');
    setWeatherGif('');
    setLoading(true);

    const response = await fetch(`${apiUrl}/weather?location=${newLocation}`);

    if (!response.ok) {
      const { error } = await response.json();
      setLoading(false);
      setWeatherError(error);
      setWeatherGif(sample(weatherGifs.Error));
      setCurrentWeather(null);
    } else {
      const { body } = await response.json();
      setLocation(newLocation);
      setLoading(false);
      setCurrentWeather(body);
      setWeatherError('');

      const gifsArray = weatherGifs[body.weatherTitle]
        ? weatherGifs[body.weatherTitle]
        : weatherGifs.default;
      setWeatherGif(sample(gifsArray));
    }
  };

  const spinnerOverride = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="ui container">
      <h2 className="ui header">The Greatest* Weather App</h2>
      <span className="clarification">*This claim is certainly and greatly exaggerated.</span>
      <SearchBar onFormSubmit={onLocationSubmit} weatherError={weatherError} />
      <div className="ui grid">
        <div className="ui row">
          <ClipLoader css={spinnerOverride} color="blue" loading={loading} size={150} />
          <div className="sixteen wide column">
            { (location) ? (
              <h3 className="ui header">
                Current weather for&nbsp;
                {location}
              </h3>
            ) : ''}
          </div>
        </div>
        <div className="ui row">
          <div className="eight wide column">
            <WeatherGif weatherGif={weatherGif} />
          </div>
          <div className="eight wide column">
            <WeatherForecast currentWeather={currentWeather} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
