import './EmptyCourseType.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {useMultipleDishes} from 'app/features/quotations/course_type/CourseType.service';
import Image from 'app/common/components/image/Image.react';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';
import DishActions from 'app/features/quotations/dish/DishActions';

class EmptyCourseType extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    courseType: PropTypes.object.isRequired,
    openMultipleDishesDialog: PropTypes.func.isRequired,
    cleanFilters: PropTypes.func.isRequired,
    deselectDish: PropTypes.func.isRequired,
  };

  add = () => {
    const {courseType, openMultipleDishesDialog, cleanFilters, deselectDish} = this.props;
    const isMultipleDishes = useMultipleDishes(courseType);

    if (isMultipleDishes) {
      openMultipleDishesDialog();
    } else {
      cleanFilters();
      deselectDish();
      History.navigate('/presupuestos/platillos');
    }
  };

  render() {
    const {className, courseType} = this.props;

    return (
      <div id="empty-course-type" className={className}>
        <Image src={Utils.getDriveImage(courseType.picture)} onClick={this.add}/>
        <p className="title">Vacio</p>
        <p className="subtitle">Agregar una o más platillos</p>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(EmptyCourseType);