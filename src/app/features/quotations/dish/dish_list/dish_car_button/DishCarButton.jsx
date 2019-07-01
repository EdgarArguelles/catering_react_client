import './DishCarButton.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import History from 'app/router/History';
import {getCurrentCourseType} from 'app/features/quotations/course_type/CourseType.service';

const DishCarButton = () => {
  const courseTypes = useSelector(state => state.data.courseTypes);
  const selectedTab = useSelector(state => state.quotations.selectedTab);
  const courses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const courseType = getCurrentCourseType(courseTypes, selectedTab);
  const menuCourses = courses.filter(course => course.type.id === courseType.id);

  return (
    <Fab id="dish-car-button" className="floating-button animated fadeInRight"
         classes={{label: 'dish-car-button-label'}} onClick={() => History.navigate('/presupuestos/menu/editar')}>
      <Badge id="dish-car-button-badge" badgeContent={menuCourses.length} color="secondary"
             className="dish-car-badge" classes={{badge: 'dish-car-button-badge-label'}}>
        <i id="dish-car-button-icon" className="fas fa-shopping-cart" aria-hidden="true"/>
      </Badge>
    </Fab>
  );
};

export default React.memo(DishCarButton);