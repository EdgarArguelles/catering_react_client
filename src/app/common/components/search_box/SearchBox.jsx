import './SearchBox.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const SearchBox = ({id, className, initValue, onFocus, onBlur, onSearch, ...rest}) => {
  const [search, setSearch] = useState(initValue || '');
  const [focus, setFocus] = useState(!!initValue);

  const handleSearch = value => {
    onSearch(value);
    setSearch(value);
    value === '' && setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const getStartAdornment = () => {
    return (
      <InputAdornment position="start" className="search-box-adornment">
        <i className="fas fa-search" aria-hidden="true"/>
      </InputAdornment>
    );
  };

  const getEndAdornment = () => {
    if (search === '') {
      return null;
    }

    return (
      <InputAdornment position="end" className="search-box-adornment">
        <IconButton className="clear-search-box-btn" onClick={() => handleSearch('')}>
          <i className="fas fa-backspace" aria-hidden="true"/>
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