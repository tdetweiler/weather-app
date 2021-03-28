import React from 'react';
import WeatherGif from './WeatherGif';

describe('WeatherGif', () => {
  it('returns null when no gif', () => {
    const response = WeatherGif({ weatherGif: '' });
    expect(response).toEqual(null);
  });

  it('returns a div with an image when gif props', () => {
    const response = WeatherGif({ weatherGif: 'image' });
    expect(response).toEqual(<div><img alt="weatherGif" src="image" /></div>);
  });
});
