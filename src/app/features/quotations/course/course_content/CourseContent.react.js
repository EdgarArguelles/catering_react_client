import './CourseContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import formatCurrency from 'format-currency';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {getDishesPrice} from '../../dish/Dish.service';
import {useMultipleDishes} from '../../course_type/CourseType.service';
import DishActions from '../../dish/DishActions';
import MultipleDishesDialogActions from '../../course_type/multiple_dishes_dialog/MultipleDishesDialogActions';

class CourseContent extends React.Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    courseTypes: PropTypes.object.isRequired,
    dishes: PropTypes.object,
    onActionClick: PropTypes.func.isRequired,
    selectDish: PropTypes.func.isRequired,
    openMultipleDishesDialog: PropTypes.func.isRequired,
  };

  getDishesList = () => {
    const {course, courseTypes, dishes, selectDish, openMultipleDishesDialog} = this.props;

    const isMultipleDishes = useMultipleDishes(courseTypes[course.type.id]);
    const dishesInMultiple = [];
    return course.dishes.map(({id}) => {
      const dish = dishes ? dishes[id] : undefined;
      isMultipleDishes && dish && dishesInMultiple.push(dish);
      return !dish ? null : (
        <li key={dish.id} className={dish.status === 0 ? 'deprecated-text' : ''}>
          <a onClick={() => isMultipleDishes ? openMultipleDishesDialog(dishesInMultiple) : selectDish(dish.id)}>
            {`${dish.name}${dish.status === 0 ? ' (platillo dado de baja)' : ''}`}
          </a>
        </li>
      );
    });
  };

  render() {
    const {course, dishes, onActionClick} = this.props;

    return (
      <CardHeader
        className="course-content"
        avatar={<div>
          <i className="fas fa-grip-vertical course-drag-icon" aria-hidden="true"/>
          <Avatar className="avatar">{course.position}</Avatar>
        </div>}
        subheader={<ul>{this.getDishesList()}</ul>}
        action={<React.Fragment>
          <p className="price">
            {formatCurrency(getDishesPrice(course.dishes, dishes), {format: '%s%v', symbol: '$'})}
          </p>
          <IconButton onClick={onActionClick}><i className="fas fa-trash" aria-hidden="true"/></IconButton>
        </React.Fragment>}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseTypes: state.data.courseTypes,
    dishes: state.data.dishes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDish: dishId => {
      dispatch(DishActions.selectDish(dishId));
    },
    openMultipleDishesDialog: dishesInMultiple => {
      dishesInMultiple.forEach(d => dispatch(MultipleDishesDialogActions.addDish(d.id)));
      dispatch(MultipleDishesDialogActions.openDialog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseContent);