import './CourseType.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import { useMultipleDishes } from './CourseType.service';
import Animate from 'app/common/components/animate/Animate';
import CourseTypeContent from './course_type_content/CourseTypeContent';
import MultipleDishesDialog from './multiple_dishes_dialog/MultipleDishesDialog';
import MainCourse from './multiple_dishes_dialog/main_course/MainCourse';
import { selectDish } from 'app/features/quotations/dish/DishReducer';
import { cleanFilters } from 'app/features/quotations/dish/dish_filter/DishFilterReducer';
import { cleanDishes, openDialog } from './multiple_dishes_dialog/MultipleDishesDialogReducer';

const CourseType = ({ className, courseType }) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.quotations.selectedTab);
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const { isMultipleDishesDialogOpen, dishes } = multipleDishesDialog;
  const isMultipleDishes = useMultipleDishes(courseType);
  const isSnackBarOpen = !isMultipleDishesDialogOpen && dishes.length > 0;

  const animateIcon = () => Utils.animateIcon(`plus-${courseType.position}-icon`);
  const add = () => {
    animateIcon();
    if (isMultipleDishes) {
      dispatch(openDialog());
      dispatch(cleanDishes());
    } else {
      dispatch(cleanFilters());
      dispatch(selectDish(''));
      History.navigate('/presupuestos/platillos');
    }
  };

  return (
    <div className={`${className} course-type`}>
      <CourseTypeContent className={className} courseType={courseType}/>
      <div className="btn-container">
        <Animate show={courseType.position - 1 === currentTab} animationIn="rubberBand"
          className={isSnackBarOpen ? 'move-up' : ''}>
          <Fab color="primary" onClick={add} onMouseEnter={animateIcon}>
            <FontAwesomeIcon id={`plus-${courseType.position}-icon`} icon={faPlus}/>
          </Fab>
        </Animate>
      </div>

      {isMultipleDishes && (
        <MultipleDishesDialog courseType={courseType} tabToDisplay={courseType.position - 1}>
          <MainCourse/>
        </MultipleDishesDialog>
      )}
    </div>
  );
};

CourseType.propTypes = {
  className: PropTypes.string,
  courseType: PropTypes.object.isRequired,
};

export default React.memo(CourseType);