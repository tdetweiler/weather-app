import express from 'express';

const indexRouter = express.Router();
const WeatherController = require('../controllers/weather');

/**
 * GET /weather route
 * @param {string} location string containing the user's City, State, Country?
 *
 * @return {JSON} Object with current weather for location
 * */
indexRouter.get('/weather', WeatherController.getWeather);

export default indexRouter;
