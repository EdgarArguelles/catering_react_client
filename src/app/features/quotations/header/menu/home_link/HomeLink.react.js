import './HomeLink.scss';
import React from 'react';
import Button from '@material-ui/core/Button';
import History from '../../../../../router/History';

const HOME_PATH = '/presupuestos';

export default class HomeLink extends React.Component {
  static propTypes = {};

  redirectHome = () => {
    History.navigate(HOME_PATH);
  };

  render() {
    const {location: {pathname}} = History;
    if (pathname === HOME_PATH) {
      return null;
    }

    return (
      <Button id="home-link" color="inherit" onClick={this.redirectHome}>
        <i className="fas fa-home" aria-hidden="true"/>
        <p>Pagina Principal</p>
      </Button>
    );
  }
}