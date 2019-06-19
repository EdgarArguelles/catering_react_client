import './CourseType.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import {useMultipleDishes} from './CourseType.service';
import Animate from 'app/common/components/animate/Animate';
import CourseTypeContent from './course_type_content/CourseTypeContent.react';
import MultipleDishesDialog from './multiple_dishes_dialog/MultipleDishesDialog';
import MainCourse from './multiple_dishes_dialog/main_course/MainCourse.react';
import DishActions from 'app/features/quotations/dish/DishActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';
import MultipleDishesDialogActions from './multiple_dishes_dialog/MultipleDishesDialogActions';

class CourseType extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    courseType: PropTypes.object.isRequired,
    currentTab: PropTypes.number.isRequired,
    multipleDishesDialog: PropTypes.object.isRequired,
    openMultipleDishesDialog: PropTypes.func.isRequired,
    cleanFilters: PropTypes.func.isRequired,
    deselectDish: PropTypes.func.isRequired,
  };

  add = isMultipleDishes => {
    const {openMultipleDishesDialog, cleanFilters, deselectDish} = this.props;

    if (isMultipleDishes) {
      openMultipleDishesDialog();
    } else {
      cleanFilters();
      deselectDish();
      History.navigate('/presupuestos/platillos');
    }
  };

  render() {
    const {className, courseType, currentTab, multipleDishesDialog: {isMultipleDishesDialogOpen, dishes}} = this.props;
    const isMultipleDishes = useMultipleDishes(courseType);
    const isSnackBarOpen = !isMultipleDishesDialogOpen && dishes.length > 0;

    return (
      <div className={`${className} course-type`}>
        <CourseTypeContent className={className} courseType={courseType}/>
        <div className="btn-container">
          <Animate visible={courseType.position - 1 === currentTab} animationIn="rubberBand"
                   className={isSnackBarOpen ? 'move-up' : ''}>
            <Fab color="primary" onClick={() => this.add(isMultipleDishes)}>
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
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.quotations.selectedTab,
    multipleDishesDialog: state.quotations.multipleDishesDialog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openMultipleDishesDialog: () => {
      dispatch(MultipleDishesDialogActions.openDialog());
      dispatch(MultipleDishesDialogActions.cleanDishes());
    },
    cleanFilters: () => {
      dispatch(DishFilterActions.cleanFilters());
    },
    deselectDish: () => {
      dispatch(DishActions.selectDish(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseType);