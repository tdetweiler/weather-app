import axios from 'axios';
import { getWeather } from './weather';

jest.mock('axios');

describe('WeatherModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWeather', () => {
    it('should return an error axios crashes', async () => {
      const requestError = 'it crashed';
      axios.get.mockImplementationOnce(() => { throw new Error(requestError); });

      const result = await getWeather('test');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: true, data: requestError });
    });

    it('should return an error response from axios', async () => {
      const requestError = 'no city';
      const axiosError = new Error('some message');
      axiosError.response = {
        data: {
          message: requestError
        },
        status: 404
      };
      axios.get.mockImplementationOnce(() => { throw axiosError; });

      const result = await getWeather('test');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: true, data: requestError, status: 404 });
    });

    it('should return an error when request stalls from axios', async () => {
      const axiosError = new Error('some message');
      const requestExample = {
        url: 'blah blah'
      };
      axiosError.request = requestExample;
      axios.get.mockImplementationOnce(() => { throw axiosError; });

      const result = await getWeather('test');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: true, data: requestExample });
    });

    it('should return a formatted result on success', async () => {
      const exampleResponse = {
        coord: {
          lon: -122.4399,
          lat: 47.2496
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n'
          }
        ],
        base: 'stations',
        main: {
          temp: 282.53,
          feels_like: 280.21,
          temp_min: 281.48,
          temp_max: 283.71,
          pressure: 1024,
          humidity: 71
        },
        visibility: 10000,
        wind: {
          speed: 1.54,
          deg: 190
        },
        clouds: {
          all: 1
        },
        dt: 1616904957,
        sys: {
          type: 1,
          id: 6022,
          country: 'US',
          sunrise: 1616853468,
          sunset: 1616898718
        },
        timezone: -25200,
        id: 5812944,
        name: 'Tacoma',
        cod: 200
      };

      const formattedResponse = {
        weatherTitle: 'Clear',
        weatherDescription: 'clear sky',
        temp: 282.53,
        tempMin: 281.48,
        tempMax: 283.71,
        humidity: 71,
        wind: 1.54
      };

      axios.get.mockImplementationOnce(() => ({ data: exampleResponse }));

      const result = await getWeather('test');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: false, data: formattedResponse });
    });
  });
});
