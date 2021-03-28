import { getWeather } from '../models/weather';

const WeatherController = require('./weather');

jest.mock('../models/weather', () => ({
  getWeather: jest.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('weatherController', () => {
  let res = mockResponse();
  let req = { query: {} };

  beforeEach(() => {
    getWeather.mockClear();
    res = mockResponse();
    req = { query: {} };
  });

  describe('getWeather', () => {
    it('should return an error if models request fails', async () => {
      const requestError = 'No city found';
      getWeather.mockReturnValue({ data: requestError, status: 404, error: true });
      req.query = { location: 'Tacoma,WA,USA' };

      await WeatherController.getWeather(req, res);
      expect(getWeather).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return an error if missing location', async () => {
      const requestError = 'Location is required';

      await WeatherController.getWeather(req, res);
      expect(getWeather).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return an error (bad request) if not city,state,country location', async () => {
      const requestError = 'Location must include City, State, Country';
      req.query = { location: 'Bobsville' };

      await WeatherController.getWeather(req, res);
      expect(getWeather).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return successful weather request', async () => {
      const testResponse = { weatherTitle: 'Clear' };

      getWeather.mockReturnValue({ data: testResponse, error: false });
      req.query = { location: 'Tacoma,WA,USA' };

      await WeatherController.getWeather(req, res);
      expect(getWeather).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ body: testResponse });
    });
  });
});
