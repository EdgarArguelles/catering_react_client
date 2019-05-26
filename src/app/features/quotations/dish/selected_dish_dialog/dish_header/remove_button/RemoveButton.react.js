import './RemoveButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import MenuActions from 'app/features/quotations/menu/MenuActions';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishActions from 'app/features/quotations/dish/DishActions';

class RemoveButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dish: PropTypes.object.isRequired,
    menuCourses: PropTypes.array.isRequired,
    isMultipleDishesDialogOpen: PropTypes.bool.isRequired,
    removeCourse: PropTypes.func.isRequired,
    decreasePrice: PropTypes.func.isRequired,
    removeMultipleDishesDish: PropTypes.func.isRequired,
  };

  handleRemoveCourse = () => {
    const {
      dish, menuCourses, isMultipleDishesDialogOpen, removeCourse,
      decreasePrice, removeMultipleDishesDish,
    } = this.props;

    if (isMultipleDishesDialogOpen) {
      removeMultipleDishesDish(dish.id);
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    const course = menuCourses.find(c => c.type.id === dish.courseTypeId &&
      isEqual(c.dishes.map(d => ({id: d.id})), [{id: dish.id}]));
    removeCourse(dish.courseTypeId, course.position);
    decreasePrice(dish.price);
  };

  render() {
    const {className} = this.props;

    return (
      <Fab id="remove-button" variant="extended" color="secondary" onClick={this.handleRemoveCourse}
           className={className} classes={{label: 'remove-button-label'}}>
        <i id="remove-button-icon" className="fas fa-minus-circle button-icon" aria-hidden="true"/> Remover
      </Fab>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuCourses: state.quotations.quotation.menus.find(menu => menu.isSelected).courses,
    isMultipleDishesDialogOpen: state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCourse: (courseTypeId, position) => {
      dispatch(MenuActions.removeCourse(courseTypeId, position));
    },
    decreasePrice: amount => {
      dispatch(MenuActions.decreasePrice(amount));
    },
    removeMultipleDishesDish: dishId => {
      dispatch(MultipleDishesDialogActions.removeDish(dishId));
      dispatch(DishActions.selectDish(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveButton);