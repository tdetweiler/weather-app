import React from 'react';
import './WeatherGif.css';

const WeatherGif = ({ weatherGif }) => {
  if (!weatherGif) return null;

  return (
    <div>
      <img className="img-responsive" alt="weatherGif" src={weatherGif} />
    </div>
  );
};

export default WeatherGif;
