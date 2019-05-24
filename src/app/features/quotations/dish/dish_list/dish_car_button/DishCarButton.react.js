import './DishCarButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import History from '../../../../../router/History';
import {getCurrentCourseType} from '../../../course_type/CourseType.service';

class DishCarButton extends React.Component {
  static propTypes = {
    menuCourses: PropTypes.array.isRequired,
  };

  render() {
    const {menuCourses} = this.props;

    return (
      <Fab id="dish-car-button" className="floating-button animated fadeInRight"
           classes={{label: 'dish-car-button-label'}} onClick={() => History.navigate('/presupuestos/menu/editar')}>
        <Badge id="dish-car-button-badge" badgeContent={menuCourses.length} color="secondary"
               className="dish-car-badge" classes={{badge: 'dish-car-button-badge-label'}}>
          <i id="dish-car-button-icon" className="fas fa-shopping-cart" aria-hidden="true"/>
        </Badge>
      </Fab>
    );
  }
}

const mapStateToProps = state => {
  const courseType = getCurrentCourseType(state.data.courseTypes, state.quotations.selectedTab);
  const menuCourses = state.quotations.quotation.menus.find(menu => menu.isSelected).courses;

  return {
    menuCourses: menuCourses.filter(course => course.type.id === courseType.id),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DishCarButton);