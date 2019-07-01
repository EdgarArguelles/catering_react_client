import './HomeLink.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';

const HOME_PATH = '/presupuestos';

const HomeLink = ({location}) => {
  if (location.pathname === HOME_PATH) {
    return null;
  }

  return (
    <Button id="home-link" color="inherit" onClick={() => History.navigate(HOME_PATH)}>
      <i className="fas fa-home" aria-hidden="true"/>
      <p>Pagina Principal</p>
    </Button>
  );
};

HomeLink.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(withRouter(HomeLink));