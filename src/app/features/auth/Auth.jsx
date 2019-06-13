import './Auth.scss';
import loading from 'assets/img/loading.gif';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Facebook from './auth_button/facebook/Facebook.react';
import Google from './auth_button/google/Google.react';
import AuthActions from './AuthActions';

let stompClient;

const useCreateStompClient = (socketConnected, dispatch) => {
  useEffect(() => {
    if (socketConnected) {
      return undefined;
    }

    let timeout = null;
    const createSocket = () => {
      const socket = new SockJS(`${process.env.API_URL}/oauth/websocket`);

      stompClient = Stomp.Stomp.over(socket);
      stompClient.debug = null; // disable console messages in browser
      clearTimeout(timeout);
      stompClient.connect({}, () => dispatch(AuthActions.connectSocket()),
        () => (timeout = setTimeout(() => createSocket(), 5000)));
    };

    createSocket();

    // Clean timeout
    return () => clearTimeout(timeout);
  }, [socketConnected, dispatch]);
};

const Auth = ({onSuccess}) => {
  const dispatch = useDispatch();
  const socketConnected = useSelector(state => state.auth.socketConnected);
  useCreateStompClient(socketConnected, dispatch);

  const subscribe = state => {
    return stompClient.subscribe(`/oauth/response/${state}`, response => {
      dispatch(AuthActions.login(JSON.parse(response.body)));
      onSuccess();
    });
  };

  const getWaiting = () => {
    return (
      <div className="waiting">
        <img src={loading} className="progress" alt="progress"/>
        Conectando...
      </div>
    );
  };

  const getButtons = () => {
    return (
      <>
        <Facebook subscribe={subscribe}/>
        <Google subscribe={subscribe}/>
      </>
    );
  };

  return <div id="auth">{socketConnected ? getButtons() : getWaiting()}</div>;
};

Auth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default React.memo(Auth);