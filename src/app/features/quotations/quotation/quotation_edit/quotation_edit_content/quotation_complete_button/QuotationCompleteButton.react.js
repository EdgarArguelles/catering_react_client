import './QuotationCompleteButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from '../../../../../../router/History';
import {areEqual} from '../../../Quotation.service';
import ConfirmationDialog
  from '../../../../../../common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import QuotationsActions from '../../../../QuotationsActions';

class QuotationCompleteButton extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    quotations: PropTypes.object,
    errors: PropTypes.object,
    selectedQuotation: PropTypes.object.isRequired,
    deleteLocal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  handleShowDialog = () => {
    const {quotations, selectedQuotation} = this.props;
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, quotations ? quotations[selectedQuotation.id] : null);

    if (isQuotationStarted && isEdited) {
      this.setState({isDialogOpen: true});
      return;
    }

    this.completeQuotation();
  };

  completeQuotation = () => {
    const {loggedUser, deleteLocal} = this.props;

    deleteLocal();
    History.navigate(loggedUser ? '/presupuestos/todos' : '/presupuestos');
  };

  render() {
    const {isDialogOpen} = this.state;
    const {isFetching, errors} = this.props;
    const dialogLabel = 'Al cerrar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

    if (isFetching) {
      return null;
    }

    return (
      <React.Fragment>
        <Fab id="quotation-complete-button" className={`floating-button animated zoomIn ${errors ? 'move-up' : ''}`}
             classes={{label: 'quotation-complete-button-label'}} onClick={this.handleShowDialog}>
          <i id="quotation-complete-button-icon" className="fas fa-flag-checkered" aria-hidden="true"/>
        </Fab>

        <ConfirmationDialog title="Completar presupuesto" label={dialogLabel} okLabel="Continuar"
                            open={isDialogOpen} onClose={() => this.setState({isDialogOpen: false})}
                            onOK={this.completeQuotation}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotations: state.data.quotations,
    errors: state.data.errors.quotations,
    selectedQuotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteLocal: () => {
      dispatch(QuotationsActions.deleteLocal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationCompleteButton);