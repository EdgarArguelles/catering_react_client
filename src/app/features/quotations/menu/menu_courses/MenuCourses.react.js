import './MenuCourses.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BulletList} from 'react-content-loader';
import DishesLoader from '../../../../data/dishes/DishesLoader.react';
import {getSortedCourseTypes} from '../../course_type/CourseType.service';
import DishActions from '../../dish/DishActions';

class MenuCourses extends React.Component {
  static propTypes = {
    courseType: PropTypes.object.isRequired,
    allDishes: PropTypes.object,
    menu: PropTypes.object.isRequired,
    selectDish: PropTypes.func.isRequired,
  };

  getCourse = course => {
    const {allDishes, selectDish} = this.props;
    const dishes = [];

    course.dishes.forEach((dish, index) => {
      let ext = index === course.dishes.length - 2 ? ' y ' : ', ';
      ext = index === course.dishes.length - 1 ? '' : ext;
      dishes.push(<span key={dish.id}><a onClick={() => selectDish(dish.id)}>{allDishes[dish.id].name}</a>{ext}</span>);
    });

    return <li key={`${course.type.id}-${course.position}`}>{dishes}</li>;
  };

  getRenderer = () => {
    const {courseType, menu} = this.props;
    const courses = menu.courses.filter(course => course.type.id === courseType.id);

    return <ol type="I">{getSortedCourseTypes(courses, true).map(course => this.getCourse(course))}</ol>;
  };

  getContent = () => {
    const {menu} = this.props;

    return (
      <DishesLoader dishes={menu.courses.map(course => course.dishes).flatten()} renderer={this.getRenderer}
                    loader={<BulletList speed={1} className="loader"/>}/>
    );
  };

  render() {
    const {courseType} = this.props;

    return (
      <div className="course-type">
        <p className="name">{courseType.name}</p>
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allDishes: state.data.dishes,
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDish: dishId => {
      dispatch(DishActions.selectDish(dishId, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCourses);