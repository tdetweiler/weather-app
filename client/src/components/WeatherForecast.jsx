import React from 'react';

const WeatherForecast = ({ currentWeather }) => {
  if (!currentWeather) return null;

  return (
    <div className="ui grid">
      <div className="ui row">
        <h4 className="sixteen wide column">{currentWeather.weatherTitle}</h4>
      </div>
      <div className="ui row">
        <h5 className="sixteen wide column">{currentWeather.weatherDescription}</h5>
      </div>
      <div className="ui row">
        <span className="sixteen wide column">
          Current Temperature:&emsp;
          {Math.round(currentWeather.temp)}
          °F
        </span>
      </div>
      <div className="ui row">
        <span className="sixteen wide column">
          Today&apos;s Low:&emsp;
          {Math.round(currentWeather.tempMin)}
          °F
        </span>
      </div>
      <div className="ui row">
        <span className="sixteen wide column">
          Today&apos;s High:&emsp;
          {Math.round(currentWeather.tempMax)}
          °F
        </span>
      </div>
      <div className="ui row">
        <span className="sixteen wide column">
          Today&apos;s Humidity:&emsp;
          {Math.round(currentWeather.humidity)}
          %
        </span>
      </div>
      <div className="ui row">
        <span className="sixteen wide column">
          Wind Speed:&emsp;
          {Math.round(currentWeather.humidity)}
          MPH
        </span>
      </div>
    </div>
  );
};

export default WeatherForecast;
