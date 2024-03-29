import './Information.scss';
import React from 'react';

const Information = () => {
  return (
    <div id="information">
      <b>¿Como puedo crear un presupuesto?</b>
      <ul>
        <li>Personaliza tus menus, por ejemplo <i>Menu Principal</i> y <i>Menu Infantil.</i></li>
        <li>Personaliza los tiempos de cada Menu.</li>
        <li>Elige los platillos para cada tiempo.</li>
        <li>Obten un presupuesto para tu evento.</li>
      </ul>
    </div>
  );
};

export default React.memo(Information);