import './ViewMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import MenuDialog from 'app/features/quotations/menu/menu_summary/menu_dialog/MenuDialog.react';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class ViewMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    selectMenu: PropTypes.func.isRequired,
    openMenuDialog: PropTypes.func.isRequired,
  };

  showMenuDialog = () => {
    const {menu: {id}, selectMenu, openMenuDialog} = this.props;

    selectMenu(id);
    openMenuDialog();
  };

  hideMenuDialog = () => {
    const {onClose, selectMenu} = this.props;

    selectMenu('');
    onClose();
  };

  render() {
    return (
      <React.Fragment>
        <MenuItem id="view-menu" onClick={this.showMenuDialog}>
          <i className="fab fa-wpforms menu-icon" aria-hidden="true"/> Ver Menú
        </MenuItem>

        <MenuDialog onClose={this.hideMenuDialog}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    selectMenu: menuId => {
      dispatch(QuotationActions.selectMenu(menuId));
    },
    openMenuDialog: () => {
      dispatch(QuotationsActions.changeMenuDialogOpen(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMenu);