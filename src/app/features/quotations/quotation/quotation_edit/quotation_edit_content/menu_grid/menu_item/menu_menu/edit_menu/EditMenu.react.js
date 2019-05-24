import './EditMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import History from '../../../../../../../../../router/History';
import QuotationsActions from '../../../../../../../../quotations/QuotationsActions';
import QuotationActions from '../../../../../../../../quotations/quotation/QuotationActions';

class EditMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    selectMenu: PropTypes.func.isRequired,
    resetMenuTab: PropTypes.func.isRequired,
  };

  editMenu = () => {
    const {menu: {id}, onClose, selectMenu, resetMenuTab} = this.props;

    selectMenu(id);
    resetMenuTab();
    onClose();
    History.navigate('/presupuestos/menu/editar');
  };

  render() {
    return (
      <MenuItem id="edit-menu" onClick={this.editMenu}>
        <i className="far fa-edit menu-icon" aria-hidden="true"/> Editar Menú
      </MenuItem>
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
    resetMenuTab: () => {
      dispatch(QuotationsActions.changeMenuTab(0));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenu);