import './CourseType.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import {useMultipleDishes} from './CourseType.service';
import Animate from 'app/common/components/animate/Animate';
import CourseTypeContent from './course_type_content/CourseTypeContent';
import MultipleDishesDialog from './multiple_dishes_dialog/MultipleDishesDialog';
import MainCourse from './multiple_dishes_dialog/main_course/MainCourse';
import DishActions from 'app/features/quotations/dish/DishActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';
import MultipleDishesDialogActions from './multiple_dishes_dialog/MultipleDishesDialogActions';

const CourseType = ({className, courseType}) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.quotations.selectedTab);
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const {isMultipleDishesDialogOpen, dishes} = multipleDishesDialog;
  const isMultipleDishes = useMultipleDishes(courseType);
  const isSnackBarOpen = !isMultipleDishesDialogOpen && dishes.length > 0;

  const add = () => {
    if (isMultipleDishes) {
      dispatch(MultipleDishesDialogActions.openDialog());
      dispatch(MultipleDishesDialogActions.cleanDishes());
    } else {
      dispatch(DishFilterActions.cleanFilters());
      dispatch(DishActions.selectDish(''));
      History.navigate('/presupuestos/platillos');
    }
  };

  return (
    <div className={`${className} course-type`}>
      <CourseTypeContent className={className} courseType={courseType}/>
      <div className="btn-container">
        <Animate visible={courseType.position - 1 === currentTab} animationIn="rubberBand"
                 className={isSnackBarOpen ? 'move-up' : ''}>
          <Fab color="primary" onClick={add}>
            <i className="fas fa-plus" aria-hidden="true"/>
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