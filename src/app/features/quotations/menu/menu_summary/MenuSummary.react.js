import './MenuSummary.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import formatCurrency from 'format-currency';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditableField from 'app/common/components/editable_field/EditableField';
import MenuQuantity from './menu_quantity/MenuQuantity.react';
import RemoveMenu from './remove_menu/RemoveMenu.react';
import CompleteMenu from './complete_menu/CompleteMenu.react';
import MenuDialog from './menu_dialog/MenuDialog.react';
import MenuActions from 'app/features/quotations/menu/MenuActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class MenuSummary extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    quotation: PropTypes.object.isRequired,
    assignName: PropTypes.func.isRequired,
    changeMenuName: PropTypes.func.isRequired,
    openMenuDialog: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {menu: {name}, quotation: {menus}, assignName} = this.props;

    if (name === '') {
      assignName(menus.length);
    }
  }

  render() {
    const {menu: {name, price, quantity}, changeMenuName, openMenuDialog} = this.props;

    return (
      <div id="menu-summary">
        <Paper className="menu-summary-paper" elevation={24}>
          <EditableField value={name} placeholder="Nombre del Menú" onChange={changeMenuName}/>
          <p className="menu-summary-price">
            El precion por persona por este menú es:
            <b className="price"> {formatCurrency(price, {format: '%s%v', symbol: '$'})}</b>
          </p>
          <MenuQuantity/>
          <p className="menu-summary-total">
            El presupuestos por este menú es:
            <b className="price"> {formatCurrency(price * quantity, {format: '%s%v', symbol: '$'})}</b>
          </p>

          <div className="menu-summary-actions">
            <Button color="primary" onClick={openMenuDialog}>Ver Menú</Button>
          </div>
          <div className="menu-summary-actions menu-summary-flex">
            <RemoveMenu/>
            <CompleteMenu/>
          </div>
        </Paper>

        <MenuDialog/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    assignName: id => {
      dispatch(MenuActions.changeName(`Mi Menu ${id}`));
    },
    changeMenuName: name => {
      dispatch(MenuActions.changeName(name));
    },
    openMenuDialog: () => {
      dispatch(QuotationsActions.changeMenuDialogOpen(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSummary);