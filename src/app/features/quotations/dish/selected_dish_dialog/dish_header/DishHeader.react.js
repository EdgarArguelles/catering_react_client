import './DishHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import formatCurrency from 'format-currency';
import IconButton from '@material-ui/core/IconButton';
import {isDishAdded} from '../../Dish.service';
import AddButton from './add_button/AddButton.react';
import RemoveButton from './remove_button/RemoveButton.react';

class DishHeader extends React.Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
    showActions: PropTypes.bool.isRequired,
    multipleDishesDialog: PropTypes.object.isRequired,
    menuCourses: PropTypes.array,
    onClose: PropTypes.func,
  };

  getNavigation = () => {
    const {onClose} = this.props;

    if (!onClose) {
      return null;
    }

    return (
      <IconButton className="navigation" onClick={onClose}>
        <i className="fas fa-arrow-left" aria-hidden="true"/>
      </IconButton>
    );
  };

  getAction = () => {
    const {dish, multipleDishesDialog, menuCourses} = this.props;

    return isDishAdded(multipleDishesDialog, menuCourses, dish.id)
      ? <RemoveButton dish={dish} className="animated rubberBand"/>
      : <AddButton dish={dish} className="animated rubberBand"/>;
  };

  render() {
    const {dish, showActions} = this.props;

    return (
      <div id="dish-header">
        {this.getNavigation()}
        <div className="title">
          <b>{dish.name}</b>
          <div className="sub-title">{formatCurrency(dish.price, {format: '%s%v', symbol: '$'})}</div>
        </div>
        {showActions && dish.courseTypeId && <div className="actions">{this.getAction()}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const menu = state.quotations.quotation.menus.find(m => m.isSelected);

  return {
    showActions: !!menu && state.quotations.dish.showActions,
    multipleDishesDialog: state.quotations.multipleDishesDialog,
    menuCourses: menu && menu.courses,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DishHeader);