import axios from 'axios';

const WeatherAPI = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

export type fetchWeatherResponse = {
  data: string | currentWeatherPayload | JSON,
  error: boolean,
  status?: number
}

export type currentWeatherPayload = {
  weatherTitle: String,
  weatherDescription: String,
  temp: Number,
  tempMin: Number,
  tempMax: Number,
  humidity: Number,
  wind: Number
}

export const fetchWeather = async (location: string): Promise<fetchWeatherResponse> => {
  try {
    const res = await axios.get(
      `${WeatherAPI}/weather?q=${location}&appid=${API_KEY}&units=imperial`
    );
    const { data } = res;

    const formattedResponse = {
      weatherTitle: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      wind: data.wind.speed
    } as currentWeatherPayload;

    return { data: formattedResponse, error: false };
  } catch (err) {
    if (err.response) {
      return {
        data: err.response.data.message,
        error: true,
        status: err.response.status
      };
    }

    if (err.request) {
      return { data: err.request, error: true };
    }
    return { data: err.message, error: true };
  }
};
