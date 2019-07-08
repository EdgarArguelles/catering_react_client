import './RemoveMenu.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

const RemoveMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
    onClose();
  };

  const handleRemove = () => {
    dispatch(QuotationActions.removeMenu(menu.id));
    dispatch(NavigationActions.closeNavigationDialog(null));
    handleClose();
  };

  return (
    <>
      <MenuItem id="remove-menu" onClick={() => setIsDialogOpen(true)}>
        <i className="far fa-trash-alt menu-icon" aria-hidden="true"/> Eliminar Menú
      </MenuItem>

      <ConfirmationDialog title="Eliminar menú" label={`¿Desea eliminar el menú ${menu.name}?`} open={isDialogOpen}
                          okID="remove-menu-button" okLabel="Eliminar" onClose={handleClose} onOK={handleRemove}/>
    </>
  );
};

RemoveMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(RemoveMenu);