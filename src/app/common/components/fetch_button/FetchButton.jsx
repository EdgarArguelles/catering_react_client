/* eslint-disable max-lines */
import './FetchButton.scss';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ANIMATION_DELAY = 3000;

const FetchButton = props => {
  const {hidden, color, iconClass, label, successLabel, errorLabel, asyncCall, preconditionCall, onComplete} = props;
  const [buttonState, setButtonState] = useState('normal');
  const [isClicked, setIsClicked] = useState(false);
  const iconClassName = buttonState === 'success' ? 'fas fa-thumbs-up button-icon' :
    buttonState === 'error' ? 'fas fa-exclamation-triangle button-icon' : iconClass || 'fas fa-sync';
  const content = buttonState === 'success' ? successLabel || 'Exito' :
    buttonState === 'error' ? errorLabel || 'Ocurrio un error' : label || null;

  // handle onComplete, latestOnComplete always keeps first onComplete's value (onmount), not changes each render
  const latestOnComplete = useRef(onComplete);
  const callOnComplete = useCallback(() => {
    latestOnComplete.current && latestOnComplete.current();
  }, []); // because this useCallback has inputs = [], callOnComplete never changes its value, not changes each render

  // clean timeout and handle unmount
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
      timeout.current = 'unmonted';
      callOnComplete();
    };
  }, [callOnComplete]); // this is an unmount, because callOnComplete has inputs = [], this useEffect is [] as well

  const handleAsyncCall = useCallback(async action => {
    const updateStatus = newStatus => {
      if (timeout.current === 'unmonted') {
        callOnComplete();
        return;
      }

      setButtonState(newStatus);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setButtonState('normal');
        callOnComplete();
      }, ANIMATION_DELAY);
    };

    try {
      setButtonState('fetching');
      await action();
      updateStatus('success');
    } catch (error) {
      updateStatus('error');
    }
  }, [callOnComplete]); // because callOnComplete is an useCallback with inputs = [], this useCallback is [] as well

  // handle Fetch when preconditionCall is successful
  const latestAsyncCall = useRef(asyncCall);
  const latestPreconditionCall = useRef(preconditionCall);
  useEffect(() => {
    if (!latestAsyncCall.current && asyncCall && latestPreconditionCall.current && !preconditionCall && isClicked) {
      handleAsyncCall(asyncCall);
    }

    latestAsyncCall.current = asyncCall;
    latestPreconditionCall.current = preconditionCall;
  }, [asyncCall, preconditionCall, isClicked, handleAsyncCall]);

  const handleClick = () => {
    setIsClicked(true);
    preconditionCall ? preconditionCall() : handleAsyncCall(asyncCall);
  };

  return (
    <span className="fetch-button">
        {buttonState === 'fetching' && <CircularProgress size={50} thickness={4} className="action-progress"/>}
      <Zoom in={!hidden || buttonState !== 'normal'} unmountOnExit>
          <Fab variant="extended" color={color} disabled={buttonState !== 'normal'}
               onClick={handleClick} className={`action-button ${buttonState}`}>
            {iconClassName && <i className={iconClassName} aria-hidden="true"/>}
            <div className="button-label">{content}</div>
          </Fab>
      </Zoom>
    </span>
  );
};

FetchButton.propTypes = {
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

export default React.memo(FetchButton);