import './MenuGrid.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import MenuItem from './menu_item/MenuItem';
import {addNewMenu, selectMenu} from 'app/features/quotations/quotation/QuotationReducer';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const MenuGrid = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const selectedMenu = quotation.menus.find(menu => menu.isSelected);
  const deselectMenu = () => dispatch(selectMenu(''));
  const addAndSelectNewMenu = () => {
    const menuId = getRandomMenuId();
    dispatch(addNewMenu(menuId));
    dispatch(selectMenu(menuId));
    dispatch(QuotationsActions.changeMenuTab(0));
  };

  const handleNew = () => {
    addAndSelectNewMenu();
    History.navigate('/presupuestos/menu/editar');
  };

  const getAnimatedGrid = (id, component) => {
    return (
      <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2} className="animate__animated animate__zoomIn">
        {component}
      </Grid>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => selectedMenu && !isMenuDialogOpen && deselectMenu()}>
      <>
        <Grid id="menu-grid" container spacing={2} justify="flex-start">
          {Object.values(quotation.menus).sort(Utils.getSortString('id')).map((menu, index) => (
            getAnimatedGrid(menu.id, <MenuItem index={index} menu={menu}/>)
          ))}
          {getAnimatedGrid('new-menu', (
            <Button className="new-menu-button" onClick={handleNew}
                    onMouseEnter={() => Utils.animateIcon('new-menu-icon')}>
              <FontAwesomeIcon id="new-menu-icon" icon={faPlusCircle}/>
              Crear un nuevo menú
            </Button>
          ))}
        </Grid>
      </>
    </ClickAwayListener>
  );
};

export default React.memo(MenuGrid);