import './MenuGrid.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import MenuItem from './menu_item/MenuItem.react';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

class MenuGrid extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
    selectedMenu: PropTypes.object,
    isMenuDialogOpen: PropTypes.bool.isRequired,
    addAndSelectNewMenu: PropTypes.func.isRequired,
    deselectMenu: PropTypes.func.isRequired,
  };

  handleNew = () => {
    const {addAndSelectNewMenu} = this.props;

    addAndSelectNewMenu();
    History.navigate('/presupuestos/menu/editar');
  };

  getAnimatedGrid = (id, renderer) => {
    return <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2} className="animated zoomIn">{renderer()}</Grid>;
  };

  render() {
    const {quotation, selectedMenu, isMenuDialogOpen, deselectMenu} = this.props;

    return (
      <ClickAwayListener onClickAway={() => selectedMenu && !isMenuDialogOpen && deselectMenu()}>
        <React.Fragment>
          <Grid id="menu-grid" container spacing={16} justify="flex-start">
            {Object.values(quotation.menus).sort(Utils.getSortString('id')).map((menu, index) => (
              this.getAnimatedGrid(menu.id, () => <MenuItem index={index} menu={menu}/>)
            ))}
            {this.getAnimatedGrid('new-menu', () => (
              <Button className="new-menu-button" onClick={this.handleNew}>
                <i className="fas fa-plus-circle" aria-hidden="true"/>
                Crear un nuevo menú
              </Button>
            ))}
          </Grid>
        </React.Fragment>
      </ClickAwayListener>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
    selectedMenu: state.quotations.quotation.menus.find(menu => menu.isSelected),
    isMenuDialogOpen: state.quotations.isMenuDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAndSelectNewMenu: () => {
      const menuId = getRandomMenuId();
      dispatch(QuotationActions.addNewMenu(menuId));
      dispatch(QuotationActions.selectMenu(menuId));
      dispatch(QuotationsActions.changeMenuTab(0));
    },
    deselectMenu: () => {
      dispatch(QuotationActions.selectMenu(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuGrid);