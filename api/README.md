# Weather-App api

The Weather-app api is a lightweight RESTFUL API built ontop of Node/Typescript for fetching a locations current weather. It is intended to be used with the Weather-App's react client app.

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

## Key interactions

1. [GET] /v1/weather - Returns a payload of weather information for the requested location (sent as a query parameter - {city,state,country} format).

<details>
<summary>Example Request</summary>
<pre>
curl --location --request GET 'http://localhost:8000/v1/weather?location=Tacoma,WA,USA'
</pre>
</details>

<details>
<summary>Example Response</summary>
<pre>
{
  "body": {
    "weatherTitle": "Clear",
    "weatherDescription": "clear sky",
    "temp": 48.58,
    "tempMin": 46,
    "tempMax": 51.01,
    "humidity": 71,
    "wind": 3.44
  }
}
</pre>
</details>

## Running locally
`yarn start` - runs project locally

## Testing locally
`yarn test` - executes unit tests

## Contributing
Pull requests are welcome.

Please make sure to update tests as appropriate.
