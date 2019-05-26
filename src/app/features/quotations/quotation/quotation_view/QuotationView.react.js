import './QuotationView.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import QuotationsDataActions from 'app/data/quotations/QuotationsActions';

class QuotationView extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    changeNavigation: PropTypes.func.isRequired,
    openAuthDialog: PropTypes.func.isRequired,
    loadQuotation: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {match: {params}, loggedUser, changeNavigation, openAuthDialog, loadQuotation} = this.props;

    changeNavigation('/presupuestos');

    if (loggedUser) {
      loadQuotation(params.id);
      return;
    }

    openAuthDialog();
  }

  render() {
    const {match: {params}, openAuthDialog, loadQuotation} = this.props;

    return (
      <div id="quotation-view">
        <i className="fas fa-info-circle" aria-hidden="true"/>
        <p className="title">No tienes permisos para ver este presupuesto</p>
        <Button variant="outlined" className="access" onClick={openAuthDialog}>
          Iniciar sesión
        </Button>
        <AuthDialog onSuccess={() => loadQuotation(params.id)}/>
      </div>
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
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
    openAuthDialog: () => {
      dispatch(AuthDialogActions.openAuthDialog());
    },
    loadQuotation: async quotationId => {
      dispatch(QuotationsActions.deleteLocal());
      await dispatch(QuotationsDataActions.fetchQuotation(quotationId));
      History.navigate('/presupuestos/editar');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationView);