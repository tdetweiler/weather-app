import WeatherForecast from './WeatherForecast';

describe('WeatherForecast', () => {
  it('returns null when no current weather info', () => {
    const response = WeatherForecast({ currentWeather: null });
    expect(response).toEqual(null);
  });

  it('returns a div with an forecast info when current weather info', () => {
    const response = WeatherForecast({ currentWeather: { weatherTitle: 'Main' } });
    expect(response).not.toEqual(null);
  });
});
