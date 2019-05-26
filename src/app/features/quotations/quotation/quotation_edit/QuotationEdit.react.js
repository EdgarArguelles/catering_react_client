import './QuotationEdit.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QuotationEditContent from './quotation_edit_content/QuotationEditContent.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class QuotationEdit extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    quotation: PropTypes.object.isRequired,
    changeNavigation: PropTypes.func.isRequired,
    deselectMenu: PropTypes.func.isRequired,
    changeQuotationName: PropTypes.func.isRequired,
    setQuotationPrice: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      loggedUser, quotation: {name, menus}, changeNavigation, deselectMenu, changeQuotationName, setQuotationPrice,
    } = this.props;

    changeNavigation(loggedUser ? '/presupuestos/todos' : '/presupuestos', 'Mi Presupuesto');
    deselectMenu();
    setQuotationPrice(menus);
    if (name === '') {
      changeQuotationName('Mi Presupuesto');
    }
  }

  componentWillUpdate(nextProps) {
    const {loggedUser, quotation: {menus}, changeNavigation, setQuotationPrice} = this.props;
    const quantity = menus ? menus.reduce((accumulator, menu) => accumulator + menu.quantity, 0) : 0;
    const nextQuantity = nextProps.quotation.menus ?
      nextProps.quotation.menus.reduce((accumulator, menu) => accumulator + menu.quantity, 0) : 0;

    // if a menu was duplicated or removed or quantity have been updated
    if ((menus && nextProps.quotation.menus && menus.length !== nextProps.quotation.menus.length)
      || quantity !== nextQuantity) {
      setQuotationPrice(nextProps.quotation.menus);
    }

    if (loggedUser !== nextProps.loggedUser) {
      changeNavigation(nextProps.loggedUser ? '/presupuestos/todos' : '/presupuestos', 'Mi Presupuesto');
    }
  }

  render() {
    return <div id="quotation-edit"><QuotationEditContent/></div>;
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
    deselectMenu: () => {
      dispatch(QuotationActions.selectMenu(''));
      dispatch(QuotationsActions.changeMenuDialogOpen(false));
    },
    changeQuotationName: name => {
      dispatch(QuotationActions.changeName(name));
    },
    setQuotationPrice: menus => {
      const price = menus ? menus.reduce((accumulator, menu) => accumulator + (menu.price * menu.quantity), 0) : 0;
      dispatch(QuotationActions.setPrice(price));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationEdit);