import { getWeather } from '../models/weather';

exports.getWeather = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  if (location.split(',').length !== 3) {
    return res.status(400).json({ error: 'Location must include City, State, Country' });
  }

  const currentWeather = await getWeather(location);

  if (currentWeather.error) {
    return res.status(currentWeather.status || 500).json({ error: currentWeather.data });
  }

  return res.status(200).json({ body: currentWeather.data });
};
