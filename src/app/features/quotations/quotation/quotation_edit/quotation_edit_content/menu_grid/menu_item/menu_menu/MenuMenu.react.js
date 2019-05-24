import './MenuMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import DuplicateMenu from './duplicate_menu/DuplicateMenu.react';
import EditMenu from './edit_menu/EditMenu.react';
import RemoveMenu from './remove_menu/RemoveMenu.react';
import ViewMenu from './view_menu/ViewMenu.react';

export default class MenuMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const {menu, open, anchorEl, onClose} = this.props;

    return (
      <Popover id="menu-menu" open={open} anchorEl={anchorEl} onClose={onClose}
               anchorOrigin={{vertical: 'center', horizontal: 'center'}}
               transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <ViewMenu menu={menu} onClose={onClose}/>
        <EditMenu menu={menu} onClose={onClose}/>
        <DuplicateMenu menu={menu} onClose={onClose}/>
        <RemoveMenu menu={menu} onClose={onClose}/>
      </Popover>
    );
  }
}