![](https://media.giphy.com/media/za5xikuRr0OzK/giphy.gif)

# Weather-App

The Weather-app is a project to support user's in finding the current weather for locations of their choice. It is supported by an Express API on the backend and a React app for client interaction.

## Repositories

- [API](./api/): The details for the node backend can be found [here](./api/README.md)
- [Client](./client/): The details for the react app can be found [here](./client/README.md)

## Live demo

A live demo of the app is available at [here](https://tdetweiler.github.io/weather-app).

Please note that the input selection box is supported by Google Maps Places autocomplete and is limited to ~2000 requests a day to prevent billing. Along with that the (weather api)[https://openweathermap.org/api] this project uses is also rate limited and so a working app can not be promised if these limits are hit.

## Github Actions Deployment

Currently the project is supported with automatic deployment of the master branch upon any commits/merges. The api is currently hosting on Google app engine and the client is being hosted on Github pages.
