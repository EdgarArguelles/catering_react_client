import './DishItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from 'format-currency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Utils from 'app/common/Utils';
import { useDish } from 'app/hooks/data/Dishes';
import Image from 'app/common/components/image/Image';
import Animate from 'app/common/components/animate/Animate';
import { isDishAdded } from 'app/features/quotations/dish/Dish.service';
import { selectDish } from 'app/features/quotations/dish/DishReducer';

const DishItem = ({ dish }) => {
  const dispatch = useDispatch();
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const { data: selected } = useDish(selectedDish);
  const show = !selected || selected.id !== dish.id;
  const handleSelectDish = () => dispatch(selectDish(dish.id));

  return (
    <Animate show={show} className="dish-item" animationIn="zoomIn" animationOut="zoomOut">
      <Paper elevation={8}>
        {isDishAdded(multipleDishesDialog, menuCourses, dish.id) &&
        <FontAwesomeIcon className="added" icon={faCheckCircle}/>}
        <ButtonBase focusRipple className="dish-btn" onClick={handleSelectDish}>
          <Image className="image" alt={dish.name} smallLoading={true} src={Utils.getDriveImage(dish.picture)}/>
          <div className="image-content image-backdrop"/>
          <div className="image-content">
            <div className="image-info">
              <p className="image-title">{dish.name}</p>
              <p className="image-subtitle">{formatCurrency(dish.price, { format: '%s%v', symbol: '$' })}</p>
            </div>
            <div className="image-action">
              <FontAwesomeIcon className="info-icon" icon={faInfoCircle}/>
            </div>
          </div>
        </ButtonBase>
      </Paper>
    </Animate>
  );
};

DishItem.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default React.memo(DishItem);