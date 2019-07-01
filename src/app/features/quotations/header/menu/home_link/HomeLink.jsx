import './HomeLink.scss';
import React from 'react';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';

const HOME_PATH = '/presupuestos';

const HomeLink = () => {
  const {location: {pathname}} = History;

  if (pathname === HOME_PATH) {
    return null;
  }

  return (
    <Button id="home-link" color="inherit" onClick={() => History.navigate(HOME_PATH)}>
      <i className="fas fa-home" aria-hidden="true"/>
      <p>Pagina Principal</p>
    </Button>
  );
};

export default React.memo(HomeLink);