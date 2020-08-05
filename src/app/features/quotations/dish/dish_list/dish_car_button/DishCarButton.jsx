import './DishCarButton.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getCurrentCourseType} from 'app/features/quotations/course_type/CourseType.service';

const DishCarButton = () => {
  const courseTypes = useSelector(state => state.data.courseTypes.data);
  const selectedTab = useSelector(state => state.quotations.selectedTab);
  const courses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const courseType = getCurrentCourseType(courseTypes, selectedTab);
  const menuCourses = courses.filter(course => course.type.id === courseType.id);

  return (
    <Fab id="dish-car-button" className="floating-button animate__animated animate__fadeInRight"
         classes={{label: 'dish-car-button-label'}} onClick={() => History.navigate('/presupuestos/menu/editar')}
         onMouseEnter={() => Utils.animateIcon('dish-car-button-icon')}>
      <Badge id="dish-car-button-badge" badgeContent={menuCourses.length} color="secondary"
             className="dish-car-badge" classes={{badge: 'dish-car-button-badge-label'}}>
        <FontAwesomeIcon id="dish-car-button-icon" icon={faShoppingCart}/>
      </Badge>
    </Fab>
  );
};

export default React.memo(DishCarButton);