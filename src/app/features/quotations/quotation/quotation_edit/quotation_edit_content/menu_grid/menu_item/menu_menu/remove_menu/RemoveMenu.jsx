import './RemoveMenu.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import MenuItem from '@material-ui/core/MenuItem';
import Utils from 'app/common/Utils';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import { removeMenu } from 'app/features/quotations/quotation/QuotationReducer';
import { closeNavigationDialog } from 'app/features/quotations/header/navigation/NavigationReducer';

const RemoveMenu = ({ menu, onClose }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    Utils.animateIcon('remove-menu-icon', { strokeWidth: 10 });
    setIsDialogOpen(true);
  };

  const handleClose = removeAction => {
    setIsDialogOpen(false);
    onClose(removeAction);
  };

  const handleRemove = () => {
    const removeAction = () => {
      dispatch(removeMenu(menu.id));
      dispatch(closeNavigationDialog(null));
    };

    handleClose(removeAction);
  };

  return (
    <>
      <MenuItem id="remove-menu" onClick={handleOpen}>
        <FontAwesomeIcon id="remove-menu-icon" className="menu-icon" icon={faTrashAlt}/> Eliminar Menú
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