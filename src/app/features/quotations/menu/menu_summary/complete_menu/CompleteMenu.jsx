import './CompleteMenu.scss';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';

const CompleteMenu = () => {
  return (
    <div id="complete-menu">
      <Fab variant="extended" color="primary" onClick={() => History.navigate('/presupuestos/editar')}>
        <i className="fas fa-check button-icon" aria-hidden="true"/>
        <p>Menú listo</p>
      </Fab>
    </div>
  );
};

export default React.memo(CompleteMenu);