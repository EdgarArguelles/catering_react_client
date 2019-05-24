import './NoSession.scss';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import History from '../../../../../router/History';

export default class NoSession extends React.Component {
  static propTypes = {};

  redirect = () => {
    History.navigate('/presupuestos');
  };

  render() {
    return (
      <div id="no-session">
        <p>
          Acceder <b>sin iniciar sesion</b>, tu presupuesto se almacenara solo
          por esta visita y no podras acceder a él posteriormente o desde
          otro dispositivo.
        </p>
        <Fab id="no-session-button" variant="extended" onClick={this.redirect}
             classes={{label: 'no-session-button-label'}}>
          Acceder sin iniciar sesion
        </Fab>
      </div>
    );
  }
}