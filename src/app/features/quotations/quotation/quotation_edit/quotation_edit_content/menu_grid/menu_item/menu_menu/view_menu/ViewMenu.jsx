import './ViewMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileImage} from '@fortawesome/free-regular-svg-icons';
import MenuItem from '@material-ui/core/MenuItem';
import Utils from 'app/common/Utils';
import MenuDialog from 'app/features/quotations/menu/menu_summary/menu_dialog/MenuDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const ViewMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();
  const selectMenu = menuId => dispatch(QuotationActions.selectMenu(menuId));

  const showMenuDialog = () => {
    Utils.animateIcon('view-menu-icon', {strokeWidth: 10});
    selectMenu(menu.id);
    dispatch(QuotationsActions.changeMenuDialogOpen(true));
  };

  const hideMenuDialog = () => {
    selectMenu('');
    onClose();
  };

  return (
    <>
      <MenuItem id="view-menu" onClick={showMenuDialog}>
        <FontAwesomeIcon id="view-menu-icon" className="menu-icon" icon={faFileImage}/> Ver Menú
      </MenuItem>

      <MenuDialog onClose={hideMenuDialog}/>
    </>
  );
};

ViewMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ViewMenu);