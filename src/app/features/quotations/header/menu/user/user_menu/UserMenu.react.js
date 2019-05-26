import './UserMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import History from 'app/router/History';
import ConfirmationDialog from 'app/common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import AuthActions from 'app/features/auth/AuthActions';

class UserMenu extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  redirectToMyQuotations = () => {
    const {onClose} = this.props;
    onClose();
    History.navigate('/presupuestos/todos');
  };

  logout = () => {
    const {onClose, logout} = this.props;
    logout();
    onClose();
    window.location.replace('/');
  };

  render() {
    const {isDialogOpen} = this.state;
    const {open, anchorEl, onClose} = this.props;

    return (
      <Popover id="user-menu" open={open} anchorEl={anchorEl} onClose={onClose}
               anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <MenuItem onClick={this.redirectToMyQuotations}>
          <i className="fas fa-donate menu-icon" aria-hidden="true"/> Mis Presupuestos
        </MenuItem>
        <MenuItem onClick={() => this.setState({isDialogOpen: true})}>
          <i className="fas fa-sign-out-alt menu-icon" aria-hidden="true"/> Salir
        </MenuItem>

        <ConfirmationDialog title="Salir" label="Al salir se perderan todos los cambios no guardados ¿Desea salir?"
                            okLabel="Salir" open={isDialogOpen}
                            onClose={() => this.setState({isDialogOpen: false})}
                            onOK={this.logout}/>
      </Popover>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(AuthActions.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);