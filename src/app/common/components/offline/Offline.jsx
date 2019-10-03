import './Offline.scss';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSlash, faWifi} from '@fortawesome/free-solid-svg-icons';
import Slide from '@material-ui/core/Slide';
import Utils from 'app/common/Utils';
import AppActions from 'app/AppActions';

const Offline = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(state => state.app.isOnline);
  useEffect(() => {
    window.addEventListener('online', () => dispatch(AppActions.changeIsOnline(true)));
    window.addEventListener('offline', () => {
      dispatch(AppActions.changeIsOnline(false));
      Utils.animateIcon('wifi-icon');
      Utils.animateIcon('slash-icon');
    });
  }, [dispatch]);

  return (
    <Slide direction="right" in={!isOnline}>
      <div id="offline">
        <span className="fa-stack">
          <FontAwesomeIcon id="wifi-icon" className="fa-stack-1x" icon={faWifi}/>
          <FontAwesomeIcon id="slash-icon" className="fa-stack-1x" icon={faSlash}/>
        </span>
        Sin Conexión
      </div>
    </Slide>
  );
};

export default React.memo(Offline);