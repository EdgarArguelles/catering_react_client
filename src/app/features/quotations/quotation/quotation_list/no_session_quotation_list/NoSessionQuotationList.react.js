import './NoSessionQuotationList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';

class NoSessionQuotationList extends React.Component {
  static propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
  };

  render() {
    const {openAuthDialog} = this.props;

    return (
      <div id="no-session-quotation-list">
        <i className="fas fa-info-circle" aria-hidden="true"/>
        <p className="title">Sin sesión</p>
        <Button variant="outlined" className="access" onClick={openAuthDialog}>
          Iniciar sesión
        </Button>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openAuthDialog: () => {
      dispatch(AuthDialogActions.openAuthDialog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoSessionQuotationList);