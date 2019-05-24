import './DuplicateMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import {getRandomMenuId} from '../../../../../../../menu/Menu.service';
import QuotationActions from '../../../../../../../../quotations/quotation/QuotationActions';

class DuplicateMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    addMenu: PropTypes.func.isRequired,
  };

  duplicateMenu = () => {
    const {menu, onClose, addMenu} = this.props;

    const menuId = getRandomMenuId();
    addMenu({...menu, id: menuId, name: `${menu.name} 2`, courses: menu.courses.map(c => ({...c, id: null}))});
    onClose();
  };

  render() {
    return (
      <MenuItem id="duplicate-menu" onClick={this.duplicateMenu}>
        <i id="duplicate-menu-icon" className="far fa-copy menu-icon" aria-hidden="true"/> Duplicar Menú
      </MenuItem>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addMenu: menu => {
      dispatch(QuotationActions.addMenu(menu));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateMenu);