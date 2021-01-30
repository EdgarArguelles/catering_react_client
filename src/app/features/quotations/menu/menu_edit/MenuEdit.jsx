import './MenuEdit.scss';
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import History from 'app/router/History';
import {useCourseTypes} from 'app/hooks/data/CourseTypes';
import {getMenuFromLink, getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import MenuEditTabs from './menu_edit_tabs/MenuEditTabs';
import {changeNavigation} from 'app/features/quotations/header/navigation/NavigationReducer';
import {changeMenuDialogOpen, changeMenuTab, deleteLocal} from 'app/features/quotations/QuotationsReducer';
import {addMenu, selectMenu} from 'app/features/quotations/quotation/QuotationReducer';

const MenuEdit = ({location}) => {
  const dispatch = useDispatch();
  const {data: courseTypes} = useCourseTypes();
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const search = useRef(location.search); // avoid to re-run useEffect when location changes
  const lastTab = useRef(courseTypes.length); // avoid to re-run useEffect when courseTypes changes
  useEffect(() => {
    dispatch(changeNavigation({backLink: '/presupuestos/editar', title: 'Menu'}));
    const menuFromLink = getMenuFromLink(new URLSearchParams(search.current).get('menu'));
    if (menuFromLink) {
      const menuId = getRandomMenuId();
      dispatch(deleteLocal());
      dispatch(addMenu({...menuFromLink, id: menuId}));
      dispatch(selectMenu(menuId));
      dispatch(changeMenuTab(lastTab.current));
      dispatch(changeMenuDialogOpen(true));
      History.navigate('/presupuestos/menu/editar');
      dispatch(changeNavigation({backLink: '/presupuestos/editar', title: 'Menu'}));
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