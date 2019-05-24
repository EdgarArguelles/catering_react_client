import './AuthButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';

const subscriptions = {};

export default class AuthButton extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    subscribe: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.randomState = Math.random().toString(36).substring(2);
  }

  componentDidMount() {
    const {id, subscribe} = this.props;

    subscriptions[id] && subscriptions[id].unsubscribe();
    subscriptions[id] = subscribe(this.randomState);
  }

  access = () => {
    const {url} = this.props;
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

    const newWindow = window.open(`${process.env.API_URL}${url}?state=${this.randomState}`, 'authentication',
      `width=${w / systemZoom},height=${h / systemZoom},left=${left},top=${top}`);
    window.focus && newWindow.focus();
  };

  render() {
    const {id, classes, children} = this.props;

    return (
      <Fab variant="extended" id={id} className="auth-button" classes={classes} onClick={this.access}>
        {children}
      </Fab>
    );
  }
}