/* eslint-disable max-lines */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle, faSync, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Utils from 'app/common/Utils';

export const ANIMATION_DELAY = 3000;

const FetchButton = props => {
  const {id, hidden, color, icon, label, successLabel, errorLabel, asyncCall, preconditionCall, onComplete} = props;
  const [buttonState, setButtonState] = useState('normal');
  const [isClicked, setIsClicked] = useState(false);
  const buttonIcon = buttonState === 'success' ? faThumbsUp :
    buttonState === 'error' ? faExclamationTriangle : icon || faSync;
  const content = buttonState === 'success' ? successLabel || 'Exito' :
    buttonState === 'error' ? errorLabel || 'Ocurrio un error' : label || null;

  // handle onComplete, latestOnComplete always keeps first onComplete's value (onmount), not changes each render
  const latestOnComplete = useRef(onComplete);
  const callOnComplete = useCallback(result => {
    latestOnComplete.current && latestOnComplete.current(result);
  }, []); // because this useCallback has inputs = [], callOnComplete never changes its value, not changes each render

  // clean timeout and handle unmount
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
      timeout.current = 'unmonted';
      callOnComplete(false);
    };
  }, [callOnComplete]); // this is an unmount, because callOnComplete has inputs = [], this useEffect is [] as well

  const handleAsyncCall = useCallback(async action => {
    const updateStatus = newStatus => {
      if (timeout.current === 'unmonted') {
        callOnComplete(newStatus === 'success');
        return;
      }

      setButtonState(newStatus);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setButtonState('normal');
        callOnComplete(newStatus === 'success');
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
    Utils.animateIcon(id);
    setIsClicked(true);
    preconditionCall ? preconditionCall() : handleAsyncCall(asyncCall);
  };

  return (
    <span className="fetch-button">
        {buttonState === 'fetching' && <CircularProgress size={50} thickness={4} className="action-progress"/>}
      <Zoom in={!hidden || buttonState !== 'normal'} unmountOnExit>
          <Fab variant="extended" color={color} disabled={buttonState !== 'normal'} onClick={handleClick}
               className={`action-button ${buttonState}`}>
            {buttonIcon && <FontAwesomeIcon id={id} className="button-icon" icon={buttonIcon}/>}
            <div className="button-label">{content}</div>
          </Fab>
      </Zoom>
    </span>
  );
};

FetchButton.propTypes = {
  id: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.object,
  label: PropTypes.string,
  successLabel: PropTypes.string,
  errorLabel: PropTypes.string,
  asyncCall: PropTypes.func,
  preconditionCall: PropTypes.func,
  onComplete: PropTypes.func,
};

export default React.memo(FetchButton);