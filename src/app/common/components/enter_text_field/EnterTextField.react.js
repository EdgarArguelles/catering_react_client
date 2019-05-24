import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default class EnterTextField extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    initValue: PropTypes.string,
    onSave: PropTypes.func.isRequired,
  };

  handleSave = event => {
    const {onSave} = this.props;

    onSave(event.target.value);
  };

  handleKeyUp = event => {
    const {initValue, onSave} = this.props;

    // on Enter
    event.keyCode === 13 && this.handleSave(event);

    // on Esc
    event.keyCode === 27 && onSave(initValue || '');
  };

  render() {
    const {autoFocus, placeholder, className, initValue} = this.props;

    return (
      <TextField autoFocus={autoFocus} placeholder={placeholder} className={className} margin="dense"
                 defaultValue={initValue} onKeyUp={this.handleKeyUp} onBlur={this.handleSave}/>
    );
  }
}