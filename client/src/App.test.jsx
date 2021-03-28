import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('./components/SearchBar', () => () => (<div>Hello World</div>));
jest.mock('./components/WeatherForecast', () => () => (<div>Hello World</div>));
jest.mock('./components/WeatherGif', () => () => (<div>Hello World</div>));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
