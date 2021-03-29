import * as express from 'express';
import { fetchWeather, currentWeatherPayload } from '../models/weather';
import { getWeather } from './weather'

jest.mock('../models/weather', () => ({
  fetchWeather: jest.fn()
}));

const mockResponse = () => {
  const res = {} as express.Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('weatherController', () => {
  let res = mockResponse();
  let req = { query: {} } as express.Request;

  beforeEach(() => {
    (fetchWeather as jest.Mock).mockClear();
    res = mockResponse();
    req = { query: {} } as express.Request;
  });

  describe('getWeather', () => {
    it('should return an error if models fetch fails', async () => {
      const requestError = 'No city found';
      (fetchWeather as jest.Mock).mockReturnValue(Promise.resolve({ data: requestError, status: 404, error: true }));
      req.query = { location: 'Tacoma,WA,USA' };

      await getWeather(req, res);
      expect(fetchWeather).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return an error if missing location', async () => {
      const requestError = 'Location is required';

      await getWeather(req, res);
      expect(fetchWeather).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return an error (bad request) if not city,state,country location', async () => {
      const requestError = 'Location must include City, State, Country';
      req.query = { location: 'Bobsville' };

      await getWeather(req, res);
      expect(fetchWeather).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: requestError });
    });

    it('should return successful weather request', async () => {
      const testResponse = {} as currentWeatherPayload;

      (fetchWeather as jest.Mock).mockReturnValue(Promise.resolve({ data: testResponse, error: false }));
      req.query = { location: 'Tacoma,WA,USA' };

      await getWeather(req, res);
      expect(fetchWeather).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ body: testResponse });
    });
  });
});
