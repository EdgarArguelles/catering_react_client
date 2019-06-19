import './CreateQuotation.scss';
import image from 'assets/img/new-quotation.jpg';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import History from 'app/router/History';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import Action from 'app/features/quotations/home/action/Action.react';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class CreateQuotation extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
    addAndSelectNewMenu: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  handleQuotationRedirect = force => {
    const {quotation, addAndSelectNewMenu} = this.props;
    const isStarted = isQuotationStarted(quotation);

    if (isStarted && !force) {
      this.setState({isDialogOpen: true});
      return;
    }

    addAndSelectNewMenu();
    History.navigate('/presupuestos/menu/editar');
  };

  render() {
    const {isDialogOpen} = this.state;
    const dialogLabel = 'Al crear un nuevo presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

    return (
      <React.Fragment>
        <Action id="create-quotation" image={image} className="animated bounceInDown"
                onClick={() => this.handleQuotationRedirect(false)}>
          Crear un nuevo Presupuesto
        </Action>

        <ConfirmationDialog title="Crear nuevo presupuesto" label={dialogLabel} okLabel="Continuar"
                            open={isDialogOpen} onClose={() => this.setState({isDialogOpen: false})}
                            onOK={() => this.handleQuotationRedirect(true)}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAndSelectNewMenu: () => {
      const menuId = getRandomMenuId();
      dispatch(QuotationsActions.deleteLocal());
      dispatch(QuotationActions.addNewMenu(menuId));
      dispatch(QuotationActions.selectMenu(menuId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuotation);