import './RemoveMenu.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import { removeMenu } from 'app/features/quotations/quotation/QuotationReducer';

const RemoveMenu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id, name } = menu;

  const animateIcon = () => Utils.animateIcon('remove-menu-icon', { strokeWidth: 30 });
  const handleClick = () => {
    animateIcon();
    setIsDialogOpen(true);
  };

  const handleRemove = () => {
    dispatch(removeMenu(id));
    History.navigate('/presupuestos/editar');
  };

  return (
    <div id="remove-menu">
      <Fab variant="extended" color="secondary" onClick={handleClick} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="remove-menu-icon" className="button-icon" icon={faTrashAlt}/>
        <p>Eliminar Menú</p>
      </Fab>

      <ConfirmationDialog title="Eliminar menú" label={`¿Desea eliminar el menú ${name}?`}
        okID="remove-menu-button" okLabel="Eliminar" open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} onOK={handleRemove}/>
    </div>
  );
};

export default React.memo(RemoveMenu);