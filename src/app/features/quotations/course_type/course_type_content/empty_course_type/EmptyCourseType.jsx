import './EmptyCourseType.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {useMultipleDishes} from 'app/features/quotations/course_type/CourseType.service';
import Image from 'app/common/components/image/Image';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';
import DishActions from 'app/features/quotations/dish/DishActions';

const EmptyCourseType = ({className, courseType}) => {
  const dispatch = useDispatch();
  const isMultipleDishes = useMultipleDishes(courseType);

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
    <div id="empty-course-type" className={className}>
      <Image src={Utils.getDriveImage(courseType.picture)} alt={courseType.name} onClick={add}
             className="animate__animated animate__fadeInLeft"/>
      <p className="title animate__animated animate__fadeInLeft">Vacio</p>
      <p className="subtitle animate__animated animate__fadeInLeft">Agregar uno o más platillos</p>
    </div>
  );
};

EmptyCourseType.propTypes = {
  className: PropTypes.string,
  courseType: PropTypes.object.isRequired,
};

export default React.memo(EmptyCourseType);