import './MenuEdit.scss';
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import History from 'app/router/History';
import {getMenuFromLink, getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import MenuEditTabs from './menu_edit_tabs/MenuEditTabs';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import {addMenu, selectMenu} from 'app/features/quotations/quotation/QuotationReducer';

const MenuEdit = ({location}) => {
  const dispatch = useDispatch();
  const courseTypes = useSelector(state => state.data.courseTypes);
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const search = useRef(location.search); // avoid to re-run useEffect when location changes
  const lastTab = useRef(Object.keys(courseTypes).length); // avoid to re-run useEffect when courseTypes changes
  useEffect(() => {
    dispatch(NavigationActions.changeNavigation('/presupuestos/editar', 'Menu'));
    const menuFromLink = getMenuFromLink(new URLSearchParams(search.current).get('menu'));
    if (menuFromLink) {
      const menuId = getRandomMenuId();
      dispatch(QuotationsActions.deleteLocal());
      dispatch(addMenu({...menuFromLink, id: menuId}));
      dispatch(selectMenu(menuId));
      dispatch(QuotationsActions.changeMenuTab(lastTab.current));
      dispatch(QuotationsActions.changeMenuDialogOpen(true));
      History.navigate('/presupuestos/menu/editar');
      dispatch(NavigationActions.changeNavigation('/presupuestos/editar', 'Menu'));
    }
  }, [dispatch]);

  if (!menu) {
    return null;
  }

  return (
    <div id="menu-edit">
      <MenuEditTabs/>
    </div>
  );
};

MenuEdit.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(MenuEdit);