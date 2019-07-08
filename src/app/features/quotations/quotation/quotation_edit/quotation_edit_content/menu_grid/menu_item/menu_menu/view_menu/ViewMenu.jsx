import './ViewMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import MenuDialog from 'app/features/quotations/menu/menu_summary/menu_dialog/MenuDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const ViewMenu = ({menu, onClose}) => {
  const dispatch = useDispatch();
  const selectMenu = menuId => dispatch(QuotationActions.selectMenu(menuId));

  const showMenuDialog = () => {
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
        <i className="fab fa-wpforms menu-icon" aria-hidden="true"/> Ver Menú
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