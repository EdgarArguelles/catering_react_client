import './Offline.scss';
import React, {useEffect, useState} from 'react';
import Slide from '@material-ui/core/Slide';

const Offline = () => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));
  }, []);

  return (
    <Slide direction="right" in={isOffline}>
      <div id="offline">
        <span className="fa-stack">
          <i className="fas fa-wifi fa-stack-1x" aria-hidden="true"/>
          <i className="fas fa-slash fa-stack-1x" aria-hidden="true"/>
        </span>
        Sin Conexión
      </div>
    </Slide>
  );
};

export default React.memo(Offline);