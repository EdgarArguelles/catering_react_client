import './AddButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from '../../../../../../router/History';
import MenuActions from '../../../../menu/MenuActions';
import MultipleDishesDialogActions from '../../../../course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishActions from '../../../DishActions';

class AddButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dish: PropTypes.object.isRequired,
    menuCourses: PropTypes.array.isRequired,
    isMultipleDishesDialogOpen: PropTypes.bool.isRequired,
    addCourse: PropTypes.func.isRequired,
    increasePrice: PropTypes.func.isRequired,
    addMultipleDishesDish: PropTypes.func.isRequired,
  };

  handleAddCourse = () => {
    const {dish, menuCourses, isMultipleDishesDialogOpen, addCourse, increasePrice, addMultipleDishesDish} = this.props;

    if (isMultipleDishesDialogOpen) {
      addMultipleDishesDish(dish.id);
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    const courseTypeCourses = menuCourses.filter(course => course.type.id === dish.courseTypeId);
    addCourse(dish.courseTypeId, [dish.id], courseTypeCourses.length + 1);
    increasePrice(dish.price);
  };

  render() {
    const {className} = this.props;

    return (
      <Fab id="add-button" variant="extended" color="primary" onClick={this.handleAddCourse}
           className={className} classes={{label: 'add-button-label'}}>
        <i id="add-button-icon" className="fas fa-cart-plus button-icon" aria-hidden="true"/> Agregar
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
    addCourse: (courseTypeId, dishesIds, position) => {
      dispatch(MenuActions.addCourse(courseTypeId, dishesIds, position));
    },
    increasePrice: amount => {
      dispatch(MenuActions.increasePrice(amount));
    },
    addMultipleDishesDish: dishId => {
      dispatch(MultipleDishesDialogActions.addDish(dishId));
      dispatch(DishActions.selectDish(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);