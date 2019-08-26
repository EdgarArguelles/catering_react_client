import './Offline.scss';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSlash, faWifi} from '@fortawesome/free-solid-svg-icons';
import Slide from '@material-ui/core/Slide';
import Utils from 'app/common/Utils';

const Offline = () => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => {
      setIsOffline(true);
      Utils.animateIcon('wifi-icon');
      Utils.animateIcon('slash-icon');
    });
  }, []);

  return (
    <Slide direction="right" in={isOffline}>
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