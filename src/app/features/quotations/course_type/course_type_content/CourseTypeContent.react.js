import './CourseTypeContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import DragDrop from 'app/common/components/drag_drop/DragDrop.react';
import Course from 'app/features/quotations/course/Course';
import EmptyCourseType from './empty_course_type/EmptyCourseType.react';
import MenuActions from 'app/features/quotations/menu/MenuActions';

class CourseTypeContent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    courseType: PropTypes.object.isRequired,
    menuCourses: PropTypes.array.isRequired,
    changeCoursesPosition: PropTypes.func.isRequired,
  };

  render() {
    const {className, courseType, menuCourses, changeCoursesPosition} = this.props;
    const courses = menuCourses.filter(course => course.type.id === courseType.id);
    if (!courses.length) {
      return <EmptyCourseType className={className} courseType={courseType}/>;
    }

    return (
      <div className="course-type-content">
        <p className="title">ORDENA LOS TIEMPOS DE TU MENU</p>
        <DragDrop id="courses-draggable" draggableClassName="draggable"
                  data={getSortedCourseTypes(courses, true)}
                  onChangePosition={changeCoursesPosition}
                  drawContent={course => <Course course={course}/>}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuCourses: state.quotations.quotation.menus.find(menu => menu.isSelected).courses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCoursesPosition: newCourses => {
      dispatch(MenuActions.changeCoursesPosition(newCourses));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseTypeContent);