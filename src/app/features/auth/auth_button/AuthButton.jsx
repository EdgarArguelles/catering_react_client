import './AuthButton.scss';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Utils from 'app/common/Utils';

const subscriptions = {};
const randomState = Math.random().toString(36).substring(2);

const AuthButton = ({id, classes, url, children, subscribe}) => {
  useEffect(() => {
    subscriptions[id] && subscriptions[id].unsubscribe();
    subscriptions[id] = subscribe(id + randomState);
  }, [id, subscribe]);

  const access = () => {
    const w = 800;
    const h = 620;
    const dualScreenLeft = window.screenLeft ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ?
      document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ?
      document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(`${process.env.API_URL}${url}?state=${id + randomState}`, 'authentication',
      `width=${w / systemZoom},height=${h / systemZoom},left=${left},top=${top}`);
    window.focus && newWindow.focus();
  };

  return (
    <Fab variant="extended" id={id} className="auth-button" classes={classes} onClick={access}
         onMouseEnter={() => Utils.animateIcon(`${id}-icon`)}>{children}</Fab>
  );
};

AuthButton.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  subscribe: PropTypes.func.isRequired,
};

export default React.memo(AuthButton);