import './MenuItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import MenuItemHeader from './menu_item_header/MenuItemHeader.react';
import MenuItemContent from './menu_item_content/MenuItemContent.react';
import MenuMenu from './menu_menu/MenuMenu.react';
import QuotationActions from '../../../../QuotationActions';

class MenuItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    menu: PropTypes.object.isRequired,
    selectedMenu: PropTypes.object,
    isMenuDialogOpen: PropTypes.bool.isRequired,
    selectMenu: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {open: false, anchorEl: null, focus: {title: false, quantity: false}};
  }

  setFocusAndSelect = (source, menuId) => {
    const {selectMenu} = this.props;

    this.setState({focus: {title: source === 'title', quantity: source === 'quantity'}});
    selectMenu(menuId);
  };

  render() {
    const {open, anchorEl, focus} = this.state;
    const {index, menu, selectedMenu, isMenuDialogOpen, selectMenu} = this.props;
    const openMenu = event => this.setState({open: true, anchorEl: event.currentTarget});
    const select = source => (!selectedMenu || selectedMenu.id !== menu.id) && this.setFocusAndSelect(source, menu.id);
    const deselect = () => selectedMenu && !isMenuDialogOpen && selectMenu('');

    return (
      <Card raised className="menu-item">
        <MenuMenu menu={menu} open={open} anchorEl={anchorEl} onClose={() => this.setState({open: false})}/>
        <MenuItemHeader index={index} menu={menu} focus={focus.title} openMenu={openMenu} deselect={deselect}
                        select={() => select('title')}/>
        <MenuItemContent menu={menu} focus={focus.quantity} deselect={deselect}
                         select={() => select('quantity')}/>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedMenu: state.quotations.quotation.menus.find(menu => menu.isSelected),
    isMenuDialogOpen: state.quotations.isMenuDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectMenu: menuId => {
      dispatch(QuotationActions.selectMenu(menuId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);