import './MultipleDishesActions.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import DishesLoader from 'app/data/dishes/DishesLoader.react';
import MenuActions from 'app/features/quotations/menu/MenuActions';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';

class MultipleDishesActions extends React.Component {
  static propTypes = {
    courseType: PropTypes.object.isRequired,
    allDishes: PropTypes.object,
    menuCourses: PropTypes.array.isRequired,
    multipleDishes: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    cleanDishes: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired,
    increasePrice: PropTypes.func.isRequired,
  };

  save = () => {
    const {
      courseType, allDishes, menuCourses, multipleDishes,
      onClose, cleanDishes, addCourse, increasePrice,
    } = this.props;

    const courseTypeCourses = menuCourses.filter(course => course.type.id === courseType.id);
    const coursePrice = getDishesPrice(multipleDishes, allDishes);
    addCourse(courseType.id, multipleDishes.map(dish => dish.id), courseTypeCourses.length + 1);
    increasePrice(coursePrice);
    cleanDishes();
    onClose();
  };

  render() {
    const {multipleDishes, onClose} = this.props;

    return (
      <div className="multiple-dishes-actions">
        <Button onClick={onClose}>Cancelar</Button>
        <DishesLoader dishes={multipleDishes}>
          <Button color="primary" onClick={this.save} disabled={multipleDishes.length <= 0}>Crear</Button>
        </DishesLoader>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allDishes: state.data.dishes,
    menuCourses: state.quotations.quotation.menus.find(menu => menu.isSelected).courses,
    multipleDishes: state.quotations.multipleDishesDialog.dishes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanDishes: () => {
      dispatch(MultipleDishesDialogActions.cleanDishes());
    },
    addCourse: (courseTypeId, dishesIds, position) => {
      dispatch(MenuActions.addCourse(courseTypeId, dishesIds, position));
    },
    increasePrice: amount => {
      dispatch(MenuActions.increasePrice(amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleDishesActions);