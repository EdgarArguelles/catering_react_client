import './DuplicateMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import MenuItem from '@material-ui/core/MenuItem';
import Utils from 'app/common/Utils';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import {addMenu} from 'app/features/quotations/quotation/QuotationReducer';

const DuplicateMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();

  const duplicateMenu = () => {
    Utils.animateIcon('duplicate-menu-icon', {strokeWidth: 10});
    const menuId = getRandomMenuId();
    const newMenu = {...menu, id: menuId, name: `${menu.name} 2`, courses: menu.courses.map(c => ({...c, id: null}))};
    dispatch(addMenu(newMenu));
    onClose();
  };

  return (
    <MenuItem id="duplicate-menu" onClick={duplicateMenu}>
      <FontAwesomeIcon id="duplicate-menu-icon" className="menu-icon" icon={faCopy}/> Duplicar Menú
    </MenuItem>
  );
};

DuplicateMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(DuplicateMenu);