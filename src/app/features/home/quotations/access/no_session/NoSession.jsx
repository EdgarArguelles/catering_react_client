import './NoSession.scss';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';

const NoSession = () => {
  const redirect = () => History.navigate('/presupuestos');

  return (
    <div id="no-session">
      <p>
        Acceder <b>sin iniciar sesion</b>, tu presupuesto se almacenara solo
        por esta visita y no podras acceder a él posteriormente o desde
        otro dispositivo.
      </p>
      <Fab id="no-session-button" variant="extended" onClick={redirect} classes={{ label: 'no-session-button-label' }}>
        Acceder sin iniciar sesion
      </Fab>
    </div>
  );
};

export default React.memo(NoSession);