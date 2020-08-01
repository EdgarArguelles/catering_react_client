import './EditMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import MenuItem from '@material-ui/core/MenuItem';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import {selectMenu} from 'app/features/quotations/quotation/QuotationReducer';

const EditMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();

  const editMenu = () => {
    Utils.animateIcon('edit-menu-icon', {strokeWidth: 10});
    dispatch(selectMenu(menu.id));
    dispatch(QuotationsActions.changeMenuTab(0));
    onClose();
    History.navigate('/presupuestos/menu/editar');
  };

  return (
    <MenuItem id="edit-menu" onClick={editMenu}>
      <FontAwesomeIcon id="edit-menu-icon" className="menu-icon" icon={faEdit}/> Editar Menú
    </MenuItem>
  );
};

EditMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(EditMenu);