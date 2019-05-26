import './RemoveMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmationDialog from 'app/common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

class RemoveMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    removeMenu: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  handleClose = () => {
    const {onClose} = this.props;

    this.setState({isDialogOpen: false});
    onClose();
  };

  handleRemove = () => {
    const {menu: {id}, removeMenu} = this.props;

    removeMenu(id);
    this.handleClose();
  };

  render() {
    const {isDialogOpen} = this.state;
    const {menu: {name}} = this.props;

    return (
      <React.Fragment>
        <MenuItem id="remove-menu" onClick={() => this.setState({isDialogOpen: true})}>
          <i className="far fa-trash-alt menu-icon" aria-hidden="true"/> Eliminar Menú
        </MenuItem>

        <ConfirmationDialog title="Eliminar menú" label={`¿Desea eliminar el menú ${name}?`}
                            okID="remove-menu-button" okLabel="Eliminar" open={isDialogOpen}
                            onClose={this.handleClose} onOK={this.handleRemove}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    removeMenu: menuId => {
      dispatch(QuotationActions.removeMenu(menuId));
      dispatch(NavigationActions.closeNavigationDialog(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveMenu);