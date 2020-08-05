import './MenuItem.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import Animate from 'app/common/components/animate/Animate';
import MenuItemHeader from './menu_item_header/MenuItemHeader';
import MenuItemContent from './menu_item_content/MenuItemContent';
import MenuMenu from './menu_menu/MenuMenu';
import {selectMenu} from 'app/features/quotations/quotation/QuotationReducer';

const MenuItem = ({index, menu}) => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [removeAction, setRemoveAction] = useState(null);
  const [focus, setFocus] = useState({title: false, quantity: false});
  const handleSelectMenu = menuId => dispatch(selectMenu(menuId));
  const deselect = () => selectedMenu && !isMenuDialogOpen && selectMenu('');
  const openMenu = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onClose = action => {
    setOpen(false);
    /* if setRemoveAction(action) useState doesn't store the function, it evaluates lazy init instead,
    to store function I must use setRemoveAction(() => action) */
    typeof action === 'function' && setRemoveAction(() => action);
  };

  const setFocusAndSelect = source => {
    setFocus({title: source === 'title', quantity: source === 'quantity'});
    handleSelectMenu(menu.id);
  };

  const select = source => (!selectedMenu || selectedMenu.id !== menu.id) && setFocusAndSelect(source);

  return (
    <Animate show={!removeAction} animationIn="zoomIn" animationOut="zoomOut" onUnmount={removeAction}>
      <Card raised className="menu-item">
        <MenuMenu menu={menu} open={open} anchorEl={anchorEl} onClose={onClose}/>
        <MenuItemHeader index={index} menu={menu} focus={focus.title} openMenu={openMenu} deselect={deselect}
                        select={() => select('title')}/>
        <MenuItemContent menu={menu} focus={focus.quantity} deselect={deselect} select={() => select('quantity')}/>
      </Card>
    </Animate>
  );
};

MenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  menu: PropTypes.object.isRequired,
};

export default React.memo(MenuItem);