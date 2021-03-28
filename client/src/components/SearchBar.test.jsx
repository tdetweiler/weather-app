import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

jest.mock('react-places-autocomplete', () => () => (<div>Hello World</div>));

describe('SearchBar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
