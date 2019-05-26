import './MyQuotations.scss';
import image from 'assets/img/my-quotations.jpg';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import History from 'app/router/History';
import Action from 'app/features/quotations/home/action/Action.react';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog.react';

class MyQuotations extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    openAuthDialog: PropTypes.func.isRequired,
  };

  handleListRedirect = () => {
    const {loggedUser, openAuthDialog} = this.props;

    if (!loggedUser) {
      openAuthDialog();
      return;
    }

    History.navigate('/presupuestos/todos');
  };

  render() {
    return (
      <React.Fragment>
        <Action id="my-quotations" image={image} className="animated bounceInDown" onClick={this.handleListRedirect}>
          Mis Presupuestos
        </Action>

        <AuthDialog onSuccess={this.handleListRedirect}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openAuthDialog: () => {
      dispatch(AuthDialogActions.openAuthDialog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyQuotations);