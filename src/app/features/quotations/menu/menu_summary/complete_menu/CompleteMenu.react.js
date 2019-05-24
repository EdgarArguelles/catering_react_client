import './CompleteMenu.scss';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import History from '../../../../../router/History';

export default class CompleteMenu extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div id="complete-menu">
        <Fab variant="extended" color="primary" onClick={() => History.navigate('/presupuestos/editar')}>
          <i className="fas fa-check button-icon" aria-hidden="true"/>
          <p>Menú listo</p>
        </Fab>
      </div>
    );
  }
}