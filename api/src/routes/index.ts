import * as express from 'express';
import { getWeather } from '../controllers/weather';

const indexRouter = express.Router();

/**
 * GET /weather route
 * @param {string} location string containing the user's City, State, Country?
 *
 * @return {JSON} Object with current weather for location
 * */
indexRouter.get('/weather', getWeather);

export default indexRouter;
