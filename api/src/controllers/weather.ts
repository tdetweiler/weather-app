import * as express from 'express';
import { fetchWeather } from '../models/weather';

export type getWeatherQuery = {
  location: string
}

export const getWeather = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const { location = '' } = req.query as getWeatherQuery;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  if (location.split(',').length !== 3) {
    return res.status(400).json({ error: 'Location must include City, State, Country' });
  }

  const currentWeather = await fetchWeather(location);

  if (currentWeather.error) {
    return res.status(currentWeather.status || 500).json({ error: currentWeather.data });
  }

  return res.status(200).json({ body: currentWeather.data });
};
