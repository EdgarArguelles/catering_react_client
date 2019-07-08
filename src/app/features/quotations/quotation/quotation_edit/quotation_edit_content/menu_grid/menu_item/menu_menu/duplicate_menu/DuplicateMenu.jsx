import './DuplicateMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

const DuplicateMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();

  const duplicateMenu = () => {
    const menuId = getRandomMenuId();
    const newMenu = {...menu, id: menuId, name: `${menu.name} 2`, courses: menu.courses.map(c => ({...c, id: null}))};
    dispatch(QuotationActions.addMenu(newMenu));
    onClose();
  };

  return (
    <MenuItem id="duplicate-menu" onClick={duplicateMenu}>
      <i id="duplicate-menu-icon" className="far fa-copy menu-icon" aria-hidden="true"/> Duplicar Menú
    </MenuItem>
  );
};

DuplicateMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(DuplicateMenu);