/* eslint-disable max-lines */
import './FetchButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ANIMATION_DELAY = 3000;

export default class FetchButton extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    iconClass: PropTypes.string,
    label: PropTypes.string,
    successLabel: PropTypes.string,
    errorLabel: PropTypes.string,
    asyncCall: PropTypes.func,
    preconditionCall: PropTypes.func,
    onComplete: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {buttonState: 'normal', isClicked: false};
    this.timeout = {};
  }

  componentWillUpdate(nextProps) {
    const {asyncCall, preconditionCall} = this.props;

    if (!asyncCall && nextProps.asyncCall && preconditionCall && !nextProps.preconditionCall && this.state.isClicked) {
      this.handleAsyncCall(nextProps.asyncCall);
    }
  }

  componentWillUnmount() {
    const {onComplete} = this.props;

    clearTimeout(this.timeout);
    this.timeout = null;
    (this.state.buttonState === 'success' || this.state.buttonState === 'error') && onComplete && onComplete();
  }

  updateStatus = newStatus => {
    const {onComplete} = this.props;

    if (!this.timeout) {
      onComplete && onComplete();
      return;
    }

    this.setState({buttonState: newStatus});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({buttonState: 'normal'});
      onComplete && onComplete();
    }, ANIMATION_DELAY);
  };

  handleAsyncCall = async action => {
    try {
      this.setState({buttonState: 'fetching'});
      await action();
      this.updateStatus('success');
    } catch (error) {
      this.updateStatus('error');
    }
  };

  handleClick = () => {
    const {asyncCall, preconditionCall} = this.props;

    this.setState({isClicked: true});
    preconditionCall ? preconditionCall() : this.handleAsyncCall(asyncCall);
  };

  render() {
    const {buttonState} = this.state;
    const {hidden, color, iconClass, label, successLabel, errorLabel} = this.props;
    let iconClassName = iconClass;
    buttonState === 'fetching' && (iconClassName = iconClass || 'fas fa-sync');
    buttonState === 'success' && (iconClassName = 'fas fa-thumbs-up button-icon');
    buttonState === 'error' && (iconClassName = 'fas fa-exclamation-triangle button-icon');
    let content = label ? label : null;
    buttonState === 'success' && (content = successLabel || 'Exito');
    buttonState === 'error' && (content = errorLabel || 'Ocurrio un error');

    return (
      <span className="fetch-button">
        {buttonState === 'fetching' && <CircularProgress size={50} thickness={4} className="action-progress"/>}
        <Zoom in={!hidden || buttonState !== 'normal'} unmountOnExit>
          <Fab variant="extended" color={color} disabled={buttonState !== 'normal'}
               onClick={this.handleClick} className={`action-button ${buttonState}`}>
            {iconClassName && <i className={iconClassName} aria-hidden="true"/>}
            <div className="button-label">{content}</div>
          </Fab>
        </Zoom>
      </span>
    );
  }
}