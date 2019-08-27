import './CompleteMenu.scss';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import Utils from 'app/common/Utils';

const CompleteMenu = () => {
  const animateIcon = () => Utils.animateIcon('complete-menu-icon');
  const handleClick = () => {
    animateIcon();
    History.navigate('/presupuestos/editar');
  };

  return (
    <div id="complete-menu">
      <Fab variant="extended" color="primary" onClick={handleClick} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="complete-menu-icon" className="button-icon" icon={faCheck}/>
        <p>Menú listo</p>
      </Fab>
    </div>
  );
};

export default React.memo(CompleteMenu);