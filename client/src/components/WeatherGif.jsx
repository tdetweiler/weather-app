import React from 'react';

const WeatherGif = ({ weatherGif }) => {
  if (!weatherGif) return null;

  return (
    <div>
      <img alt="weatherGif" src={weatherGif} />
    </div>
  );
};

export default WeatherGif;
