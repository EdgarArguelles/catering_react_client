import './MenuEdit.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import History from 'app/router/History';
import {getMenuFromLink, getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import MenuEditTabs from './menu_edit_tabs/MenuEditTabs.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

class MenuEdit extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    courseTypes: PropTypes.object.isRequired,
    menu: PropTypes.object,
    changeNavigation: PropTypes.func.isRequired,
    loadRemoteMenu: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {location: {search}, courseTypes, changeNavigation, loadRemoteMenu} = this.props;

    changeNavigation('/presupuestos/editar', 'Menu');
    const menu = getMenuFromLink(new URLSearchParams(search).get('menu'));
    menu && loadRemoteMenu(menu, Object.keys(courseTypes).length);
  }

  render() {
    if (!this.props.menu) {
      return null;
    }

    return (
      <div id="menu-edit">
        <MenuEditTabs/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseTypes: state.data.courseTypes,
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
    loadRemoteMenu: (menu, tab) => {
      const menuId = getRandomMenuId();
      dispatch(QuotationsActions.deleteLocal());
      dispatch(QuotationActions.addMenu({...menu, id: menuId}));
      dispatch(QuotationActions.selectMenu(menuId));
      dispatch(QuotationsActions.changeMenuTab(tab));
      dispatch(QuotationsActions.changeMenuDialogOpen(true));
      History.navigate('/presupuestos/menu/editar');
      dispatch(NavigationActions.changeNavigation('/presupuestos/editar', 'Menu'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuEdit);