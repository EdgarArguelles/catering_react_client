import './Auth.scss';
import loading from 'assets/img/loading.gif';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Facebook from './auth_button/facebook/Facebook.react';
import Google from './auth_button/google/Google.react';
import AuthActions from './AuthActions';

let stompClient;

class Auth extends React.Component {
  static propTypes = {
    socketConnected: PropTypes.bool.isRequired,
    connectSocket: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.timeout = {};
  }

  componentDidMount() {
    const {socketConnected} = this.props;
    !socketConnected && this.createSocket();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  createSocket = () => {
    const {connectSocket} = this.props;
    const socket = new SockJS(`${process.env.API_URL}/oauth/websocket`);

    stompClient = Stomp.Stomp.over(socket);
    stompClient.debug = null; // disable console messages in browser
    clearTimeout(this.timeout);
    stompClient.connect({}, () => connectSocket(), () => (this.timeout = setTimeout(() => this.createSocket(), 5000)));
  };

  subscribe = state => {
    const {login, onSuccess} = this.props;

    return stompClient.subscribe(`/oauth/response/${state}`, response => {
      login(JSON.parse(response.body));
      onSuccess();
    });
  };

  getWaiting = () => {
    return (
      <div className="waiting">
        <img src={loading} className="progress"/>
        Conectando...
      </div>
    );
  };

  getButtons = () => {
    return (
      <React.Fragment>
        <Facebook subscribe={this.subscribe}/>
        <Google subscribe={this.subscribe}/>
      </React.Fragment>
    );
  };

  render() {
    const {socketConnected} = this.props;

    return <div id="auth">{socketConnected ? this.getButtons() : this.getWaiting()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    socketConnected: state.auth.socketConnected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectSocket: () => {
      dispatch(AuthActions.connectSocket());
    },
    login: body => {
      dispatch(AuthActions.login(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);