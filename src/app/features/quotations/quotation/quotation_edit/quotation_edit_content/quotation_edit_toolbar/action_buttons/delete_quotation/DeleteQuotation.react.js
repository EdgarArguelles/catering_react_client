import './DeleteQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import History from 'app/router/History';
import ConfirmationDialog from 'app/common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import FetchButton, {ANIMATION_DELAY} from 'app/common/components/fetch_button/FetchButton.react';
import DataQuotationsActions from 'app/data/quotations/QuotationsActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class DeleteQuotation extends React.Component {
  static propTypes = {
    isRemoteProcessing: PropTypes.bool.isRequired,
    quotation: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    deleteQuotation: PropTypes.func.isRequired,
    cleanError: PropTypes.func.isRequired,
    endRemoteProcess: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false, shouldDelete: false};
    this.timeout = {};
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  handleDeleteQuotation = async () => {
    const {quotation: {id}, deleteQuotation} = this.props;

    try {
      await deleteQuotation(id);
    } catch (e) {
      throw e;
    } finally {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => History.navigate('/presupuestos/todos'), ANIMATION_DELAY);
    }
  };

  render() {
    const {isDialogOpen, shouldDelete} = this.state;
    const {isRemoteProcessing, quotation: {name}, isFetching, errors, cleanError, endRemoteProcess} = this.props;
    const preconditionCall = shouldDelete ? null : () => this.setState({isDialogOpen: true, shouldDelete: false});
    const asyncCall = shouldDelete ? this.handleDeleteQuotation : null;

    return (
      <span id="delete-quotation">
        <FetchButton color="secondary" label="Eliminar Presupuesto" successLabel="Presupuesto Eliminado"
                     hidden={isRemoteProcessing || isFetching} iconClass="fas fa-trash button-icon"
                     onComplete={endRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <ConfirmationDialog title="Eliminar presupuesto" okID="remove-remote-quotation-button" okLabel="Eliminar"
                            open={isDialogOpen} label={`¿Desea eliminar definitivamente el presupuesto ${name}?`}
                            onClose={() => this.setState({isDialogOpen: false, shouldDelete: false})}
                            onOK={() => this.setState({isDialogOpen: false, shouldDelete: true})}/>
        <Snackbar open={!!errors && errors.errorCode !== 401 && errors.errorCode !== 403 && shouldDelete}
                  TransitionComponent={Slide} autoHideDuration={10000} onClose={cleanError}
                  message="Ocurrió un error al intentar eliminar el presupuesto"/>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRemoteProcessing: state.quotations.isRemoteProcessing,
    quotation: state.quotations.quotation,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    errors: state.data.errors.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteQuotation: async quotationId => {
      await dispatch(DataQuotationsActions.deleteQuotation(quotationId));
      dispatch(QuotationsActions.deleteLocal());
    },
    cleanError: () => {
      dispatch(DataQuotationsActions.cleanError());
    },
    endRemoteProcess: () => {
      dispatch(QuotationsActions.endRemoteProcess());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteQuotation);