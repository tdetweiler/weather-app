import React, { useRef, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const SearchBar = ({ onFormSubmit, weatherError }) => {
  const [locationText, setLocationText] = useState('');
  const [dropdownSelected, setDropdownSelected] = useState(0);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const selected = useRef();

  const handleSelect = (address) => {
    setLocationText(address);
    setDropDownVisible(false);
    onFormSubmit(address);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setDropdownSelected(dropdownSelected + 1);
    }
    if (e.key === 'ArrowUp' && dropdownSelected > 0) {
      e.preventDefault();
      setDropdownSelected(dropdownSelected - 1);
    }
    if (e.key === 'Enter') {
      setDropDownVisible(false);
      if (!selected.current || !selected.current.textContent) {
        onFormSubmit(e.value);
      } else {
        onFormSubmit(selected.current.textContent);
      }
      setDropdownSelected(0);
      setLocationText('');
    }
  };

  const handleInputChange = (value) => {
    setLocationText(value);
    setDropDownVisible(true);
  };

  const addressSearchOptions = {
    types: ['(cities)'],
    componentRestrictions: { country: 'us' },
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={(e) => e.preventDefault()} className="ui form">
        <div className="field">
          <PlacesAutocomplete
            value={locationText}
            onChange={(value) => handleInputChange(value)}
            onSelect={handleSelect}
            searchOptions={addressSearchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <label htmlFor="city">
                  Where you at?
                  <input
                    id="city"
                    {...getInputProps({
                      placeholder: 'City, State, USA',
                      className: 'location-search-input',
                    })}
                    onKeyDown={handleKeyPress}
                  />
                </label>
                <div className="autocomplete-dropdown-container">
                  {suggestions.map((suggestion, i) => (
                    <div
                      style={!dropDownVisible ? { display: 'none' } : {}}
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion)}
                    >
                      <span
                        style={i === dropdownSelected ? { color: 'blue', cursor: 'pointer' } : { cursor: 'pointer' }}
                        ref={(i === dropdownSelected) ? selected : null}
                      >
                        {suggestion.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </form>
      <div className="ui warning message" style={!weatherError ? { display: 'none' } : {}}>
        <p>{(typeof weatherError === 'string') ? weatherError : 'Error fetching weather for location'}</p>
      </div>
    </div>
  );
};

export default SearchBar;
