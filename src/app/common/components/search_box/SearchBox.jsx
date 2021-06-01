import './SearchBox.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Utils from 'app/common/Utils';

const SearchBox = ({ id, className, initValue, onFocus, onBlur, onSearch, ...rest }) => {
  const [search, setSearch] = useState(initValue || '');
  const [focus, setFocus] = useState(!!initValue);

  const handleSearch = value => {
    onSearch(value);
    setSearch(value);
    value === '' && setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
    Utils.animateIcon('search-box-start-icon');
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const getStartAdornment = () => {
    return (
      <InputAdornment position="start" className="search-box-adornment">
        <FontAwesomeIcon id="search-box-start-icon" icon={faSearch}/>
      </InputAdornment>
    );
  };

  const getEndAdornment = () => {
    if (search === '') {
      return null;
    }

    return (
      <InputAdornment position="end" className="search-box-adornment">
        <IconButton className="clear-search-box-btn" onClick={() => handleSearch('')}
          onMouseEnter={() => Utils.animateIcon('search-box-end-icon')}>
          <FontAwesomeIcon id="search-box-end-icon" icon={faBackspace}/>
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <Input id={id} placeholder="Buscar" className={`${className} ${search !== '' || focus ? 'search-active' : ''}`}
      fullWidth={true} value={search} startAdornment={getStartAdornment()} endAdornment={getEndAdornment()}
      onChange={event => handleSearch(event.target.value)} onFocus={handleFocus} onBlur={handleBlur} {...rest}/>
  );
};

SearchBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  initValue: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
};

export default React.memo(SearchBox);