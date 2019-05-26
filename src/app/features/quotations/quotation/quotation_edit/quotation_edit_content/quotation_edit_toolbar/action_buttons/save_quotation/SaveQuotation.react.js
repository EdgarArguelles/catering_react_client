import './SaveQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import FetchButton from 'app/common/components/fetch_button/FetchButton.react';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog.react';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import DataQuotationsActions from 'app/data/quotations/QuotationsActions';

class SaveQuotation extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    isRemoteProcessing: PropTypes.bool.isRequired,
    quotation: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    openAuthDialog: PropTypes.func.isRequired,
    saveQuotation: PropTypes.func.isRequired,
    cleanError: PropTypes.func.isRequired,
    endRemoteProcess: PropTypes.func.isRequired,
  };

  render() {
    const {
      loggedUser, isRemoteProcessing, quotation, isFetching, errors, openAuthDialog, saveQuotation,
      cleanError, endRemoteProcess,
    } = this.props;
    const errorMessage = errors && (errors.errorCode === 401 || errors.errorCode === 403) ? 'Usuario sin sesión'
      : quotation.menus && quotation.menus.filter(menu => menu.courses.length === 0).length > 0
        ? 'No puede haber menús vacíos' : 'Ocurrió un error al intentar guardar el presupuesto';
    const preconditionCall = loggedUser ? null : openAuthDialog;
    const asyncCall = loggedUser ? async () => await saveQuotation(quotation) : null;
    const labelAction = quotation.id ? 'Guardados' : 'Guardado';
    const label = quotation.id ? 'Cambios' : 'Presupuesto';

    return (
      <span id="save-quotation">
        <FetchButton color="primary" label={`Guardar ${label}`} successLabel={`${label} ${labelAction}`}
                     hidden={isRemoteProcessing || isFetching} iconClass="fas fa-save button-icon"
                     onComplete={endRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <AuthDialog/>
        <Snackbar open={!!errors} autoHideDuration={10000} onClose={cleanError} message={errors ? errorMessage : ''}/>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    isRemoteProcessing: state.quotations.isRemoteProcessing,
    quotation: state.quotations.quotation,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    errors: state.data.errors.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openAuthDialog: () => {
      dispatch(AuthDialogActions.openAuthDialog());
    },
    saveQuotation: async quotation => {
      let quotationId;
      if (!quotation.id) {
        const response = await dispatch(DataQuotationsActions.createQuotation({
          ...quotation,
          menus: quotation.menus.map(menu => ({...menu, id: null})),
        }));
        quotationId = response.data.createQuotation.id;
      } else {
        const response = await dispatch(DataQuotationsActions.editQuotation({
          ...quotation,
          menus: quotation.menus.map(menu => {
            if (menu.id.startsWith('local-')) {
              return {...menu, id: null};
            }

            return menu;
          }),
        }));
        quotationId = response.data.updateQuotation.id;
      }
      await dispatch(DataQuotationsActions.fetchQuotation(quotationId));
    },
    cleanError: () => {
      dispatch(DataQuotationsActions.cleanError());
    },
    endRemoteProcess: () => {
      dispatch(QuotationsActions.endRemoteProcess());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveQuotation);