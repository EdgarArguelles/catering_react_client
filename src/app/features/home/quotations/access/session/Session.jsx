import './Session.scss';
import React from 'react';
import Auth from 'app/features/auth/Auth';
import History from 'app/router/History';

const Session = () => {
  const redirect = () => History.navigate('/presupuestos');

  return (
    <div id="session">
      <p>
        Acceder <b>iniciando sesion</b> con tu cuante de Google o Facebook,
        tu presupuesto se almacenara y podras acceder a él posteriormente, incluso
        desde cualquier otro dispositivo.
      </p>
      <Auth onSuccess={redirect}/>
    </div>
  );
};

export default React.memo(Session);