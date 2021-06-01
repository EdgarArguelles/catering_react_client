import './HomeLink.scss';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';

const HOME_PATH = '/presupuestos';

const HomeLink = () => {
  const location = useLocation();

  if (location.pathname === HOME_PATH) {
    return null;
  }

  return (
    <Button id="home-link" color="inherit" onClick={() => History.navigate(HOME_PATH)}
      onMouseEnter={() => Utils.animateIcon('menu-home-icon')}>
      <FontAwesomeIcon id="menu-home-icon" icon={faHome}/>
      <p>Pagina Principal</p>
    </Button>
  );
};

export default React.memo(HomeLink);