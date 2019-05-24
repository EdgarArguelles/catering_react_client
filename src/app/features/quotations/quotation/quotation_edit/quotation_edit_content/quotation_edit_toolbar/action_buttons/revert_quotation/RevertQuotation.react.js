import './RevertQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import History from '../../../../../../../../router/History';
import ConfirmationDialog
  from '../../../../../../../../common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import QuotationsActions from '../../../../../../QuotationsActions';
import QuotationActions from '../../../../../QuotationActions';

class RevertQuotation extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
    quotation: PropTypes.object.isRequired,
    isRemoteProcessing: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    quotations: PropTypes.object,
    deleteLocal: PropTypes.func.isRequired,
    revertQuotation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false, isErrorOpen: false};
  }

  revertDeleteQuotation = () => {
    const {quotation: {id}, quotations, deleteLocal, revertQuotation} = this.props;

    if (id) {
      this.setState({isDialogOpen: false});
      revertQuotation(quotations[id]);
    } else {
      deleteLocal();
      History.navigate('/presupuestos');
    }
  };

  render() {
    const {isDialogOpen, isErrorOpen} = this.state;
    const {hidden, loggedUser, quotation: {id, name}, isRemoteProcessing, isFetching} = this.props;
    const showError = !loggedUser && !!id;
    const icon = id ? 'fa-history' : 'fa-trash';
    const idAction = id ? 'revert-quotation-button' : 'remove-quotation-button';
    const labelAction = id ? 'Revertir' : 'Eliminar';
    const label = id ? 'cambios' : 'presupuesto';
    const labelDialog = id ? 'los cambios de' : 'el presupuesto';

    return (
      <span id="revert-quotation">
        <Zoom in={!isRemoteProcessing && !isFetching && !hidden} timeout={1000} unmountOnExit>
          <Fab variant="extended" color="secondary"
               onClick={() => this.setState({isDialogOpen: !showError, isErrorOpen: showError})}>
            <i className={`fas ${icon} button-icon`} aria-hidden="true"/>
            <div className="button-label">{`${labelAction} ${label}`}</div>
          </Fab>
        </Zoom>

        <Snackbar open={isErrorOpen} autoHideDuration={3000} message="Usuario sin sesión"
                  onClose={() => this.setState({isErrorOpen: false})}/>
        <ConfirmationDialog title={`${labelAction} ${label}`} okID={idAction} okLabel={labelAction} open={isDialogOpen}
                            label={`¿Desea ${labelAction.toLowerCase()} ${labelDialog} ${name}?`}
                            onClose={() => this.setState({isDialogOpen: false})} onOK={this.revertDeleteQuotation}/>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    quotation: state.quotations.quotation,
    isRemoteProcessing: state.quotations.isRemoteProcessing,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotations: state.data.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteLocal: () => {
      dispatch(QuotationsActions.deleteLocal());
    },
    revertQuotation: quotation => {
      dispatch(QuotationActions.revertQuotation(quotation));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevertQuotation);