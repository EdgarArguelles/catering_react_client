import './RemoveMenu.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

const RemoveMenu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {id, name} = menu;

  const handleRemove = () => {
    dispatch(QuotationActions.removeMenu(id));
    History.navigate('/presupuestos/editar');
  };

  return (
    <div id="remove-menu">
      <Fab variant="extended" color="secondary" onClick={() => setIsDialogOpen(true)}>
        <i className="fas fa-trash-alt button-icon" aria-hidden="true"/>
        <p>Eliminar Menú</p>
      </Fab>

      <ConfirmationDialog title="Eliminar menú" label={`¿Desea eliminar el menú ${name}?`}
                          okID="remove-menu-button" okLabel="Eliminar" open={isDialogOpen}
                          onClose={() => setIsDialogOpen(false)} onOK={handleRemove}/>
    </div>
  );
};

export default React.memo(RemoveMenu);