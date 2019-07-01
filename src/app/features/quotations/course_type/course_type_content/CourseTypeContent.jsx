import './CourseTypeContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import DragDrop from 'app/common/components/drag_drop/DragDrop';
import Course from 'app/features/quotations/course/Course';
import EmptyCourseType from './empty_course_type/EmptyCourseType';
import MenuActions from 'app/features/quotations/menu/MenuActions';

const CourseTypeContent = ({className, courseType}) => {
  const dispatch = useDispatch();
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const courses = menuCourses.filter(course => course.type.id === courseType.id);
  const changeCoursesPosition = newCourses => dispatch(MenuActions.changeCoursesPosition(newCourses));

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
};

CourseTypeContent.propTypes = {
  className: PropTypes.string,
  courseType: PropTypes.object.isRequired,
};

export default React.memo(CourseTypeContent);