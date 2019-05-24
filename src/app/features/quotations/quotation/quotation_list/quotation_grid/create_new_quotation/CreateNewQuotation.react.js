import './CreateNewQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from '../../../../../../router/History';
import {getRandomMenuId} from '../../../../menu/Menu.service';
import ConfirmationDialog
  from '../../../../../../common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import QuotationActions from '../../../QuotationActions';
import QuotationsActions from '../../../../QuotationsActions';
import {areEqual} from '../../../Quotation.service';

class CreateNewQuotation extends React.Component {
  static propTypes = {
    quotations: PropTypes.object,
    selectedQuotation: PropTypes.object.isRequired,
    newQuotation: PropTypes.func.isRequired,
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

    this.createNewQuotation();
  };

  createNewQuotation = () => {
    const {newQuotation} = this.props;

    newQuotation();
    History.navigate('/presupuestos/menu/editar');
  };

  render() {
    const {isDialogOpen} = this.state;
    const dialogLabel = 'Al crear un nuevo presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

    return (
      <React.Fragment>
        <Button id="create-new-quotation" onClick={this.handleShowDialog}>
          <i className="fas fa-plus-circle" aria-hidden="true"/>
          Crear un nuevo presupuesto
        </Button>

        <ConfirmationDialog title="Crear nuevo presupuesto" label={dialogLabel} okLabel="Continuar"
                            open={isDialogOpen} onClose={() => this.setState({isDialogOpen: false})}
                            onOK={this.createNewQuotation}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotations: state.data.quotations,
    selectedQuotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newQuotation: () => {
      const menuId = getRandomMenuId();
      dispatch(QuotationsActions.deleteLocal());
      dispatch(QuotationActions.addNewMenu(menuId));
      dispatch(QuotationActions.selectMenu(menuId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewQuotation);