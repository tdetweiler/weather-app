![](https://media.giphy.com/media/5W5TOAKuoZfa0/giphy.gif)

# Weather-App client

The Weather-app client is a react app built to allow users to enter a city of their choice and get current weather information for it.

## Demo

A live demo of the app is available at [here](https://tdetweiler.github.io/weather-app).

Please note that the input selection box is supported by Google Maps Places autocomplete and is limited to ~2000 requests a day to prevent billing. Along with that the (weather api)[https://openweathermap.org/api] this project uses is also rate limited and so a working app can not be promised if these limits are hit.

## Requirements

- Node and NPM must exist on the machine

## Installation

Upon cloning use the package manager [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/) to install required dependencies.

```bash
npm install
```

```bash
yarn install
```

In order to run the project locally you will need the (api express server running locally)[../api/README.md] and the localhost url in [app.jsx](./src/App.jsx#L14)`.

## Running locally
`yarn start` - runs project locally

## Testing locally
`yarn test` - executes unit tests

## Contributing
Pull requests are welcome.

Please make sure to update tests as appropriate.
