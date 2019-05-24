import './EmptyQuotationList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from '../../../../../router/History';
import {getRandomMenuId} from '../../../menu/Menu.service';
import {getEditPath, isQuotationStarted} from '../../Quotation.service';
import QuotationActions from '../../QuotationActions';
import QuotationsActions from '../../../QuotationsActions';

class EmptyQuotationList extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    addAndSelectNewMenu: PropTypes.func.isRequired,
  };

  handleQuotationRedirect = () => {
    const {quotation, isStarted, addAndSelectNewMenu} = this.props;
    if (!isStarted) {
      addAndSelectNewMenu();
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    History.navigate(getEditPath(quotation));
  };

  render() {
    const {isStarted} = this.props;

    return (
      <div id="empty-quotation-list">
        <i className="fas fa-info-circle" aria-hidden="true"/>
        <p className="title">Vacio</p>
        <p className="subtitle">Aún no has creado ningún presupuesto</p>
        <Button variant="outlined" className="create" onClick={this.handleQuotationRedirect}>
          {isStarted ? 'Continuar con el Presupuesto' : 'Crear Un Presupuesto'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
    isStarted: isQuotationStarted(state.quotations.quotation),
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

export default connect(mapStateToProps, mapDispatchToProps)(EmptyQuotationList);