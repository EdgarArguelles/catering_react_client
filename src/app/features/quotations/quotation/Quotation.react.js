import './Quotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import formatCurrency from 'format-currency';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import History from 'app/router/History';
import {areEqual} from './Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

class Quotation extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    quotation: PropTypes.object.isRequired,
    quotations: PropTypes.object,
    selectedQuotation: PropTypes.object.isRequired,
    selectQuotation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  handleSelectQuotation = () => {
    const {quotation: {id}, quotations, selectedQuotation, selectQuotation} = this.props;
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, quotations ? quotations[selectedQuotation.id] : null);

    if (selectedQuotation.id === id) {
      History.navigate('/presupuestos/editar');
      return;
    }

    if (isQuotationStarted && isEdited) {
      this.setState({isDialogOpen: true});
      return;
    }

    selectQuotation(id);
  };

  render() {
    const {isDialogOpen} = this.state;
    const {index, quotation, selectQuotation} = this.props;
    const createdAt = quotation.createdAt ? moment(`${quotation.createdAt}Z`) : moment();
    const dialogLabel = 'Al seleccionar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

    return (
      <React.Fragment>
        <ButtonBase focusRipple className="quotation" onClick={this.handleSelectQuotation}>
          <Card raised className="quotation-card">
            <CardContent>
              <Avatar className="avatar">{index + 1}</Avatar>
              <p className="title">{quotation.name}</p>
              <p className="price">
                El precio de este presupuesto es:<br/>
                <span className="amount">{formatCurrency(quotation.price, {format: '%s%v', symbol: '$'})}</span>
              </p>
              <div className="date">
                <p className="relative-date">Creado {createdAt.locale('es').fromNow()}</p>
                <p className="exact-date"> ({createdAt.locale('es').format('LLLL')})</p>
              </div>
            </CardContent>
          </Card>
        </ButtonBase>

        <ConfirmationDialog title="Seleccionar presupuesto" label={dialogLabel} okLabel="Continuar"
                            open={isDialogOpen} onClose={() => this.setState({isDialogOpen: false})}
                            onOK={() => selectQuotation(quotation.id)}/>
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
    selectQuotation: quotationId => {
      dispatch(QuotationsActions.fetchQuotation(quotationId));
      History.navigate('/presupuestos/editar');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);