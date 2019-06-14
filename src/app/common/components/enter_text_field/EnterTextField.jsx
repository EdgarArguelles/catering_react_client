import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const EnterTextField = ({autoFocus, placeholder, className, initValue, onSave}) => {
  const handleSave = event => onSave(event.target.value);

  const handleKeyUp = event => {
    // on Enter
    event.keyCode === 13 && handleSave(event);

    // on Esc
    event.keyCode === 27 && onSave(initValue || '');
  };

  return (
    <TextField autoFocus={autoFocus} placeholder={placeholder} className={className} margin="dense"
               defaultValue={initValue} onKeyUp={handleKeyUp} onBlur={handleSave}/>
  );
};

EnterTextField.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  initValue: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default React.memo(EnterTextField);