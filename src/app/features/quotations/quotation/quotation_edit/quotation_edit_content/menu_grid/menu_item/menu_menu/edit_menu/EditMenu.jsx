import './EditMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import History from 'app/router/History';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

const EditMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();

  const editMenu = () => {
    dispatch(QuotationActions.selectMenu(menu.id));
    dispatch(QuotationsActions.changeMenuTab(0));
    onClose();
    History.navigate('/presupuestos/menu/editar');
  };

  return (
    <MenuItem id="edit-menu" onClick={editMenu}>
      <i className="far fa-edit menu-icon" aria-hidden="true"/> Editar Menú
    </MenuItem>
  );
};

EditMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(EditMenu);