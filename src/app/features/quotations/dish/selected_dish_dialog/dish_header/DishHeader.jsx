import './DishHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import {isDishAdded} from 'app/features/quotations/dish/Dish.service';
import AddButton from './add_button/AddButton';
import RemoveButton from './remove_button/RemoveButton';

const DishHeader = ({dish, onClose}) => {
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const showActions = useSelector(state => state.quotations.dish.showActions);
  const menuCourses = menu ? menu.courses : [];

  const getNavigation = () => {
    if (!onClose) {
      return null;
    }

    return <IconButton className="navigation" onClick={onClose}><FontAwesomeIcon icon={faArrowLeft}/></IconButton>;
  };

  const getAction = () => {
    return isDishAdded(multipleDishesDialog, menuCourses, dish.id)
      ? <RemoveButton dish={dish} className="animated rubberBand"/>
      : <AddButton dish={dish} className="animated rubberBand"/>;
  };

  return (
    <div id="dish-header">
      {getNavigation()}
      <div className="title">
        <b>{dish.name}</b>
        <div className="sub-title">{formatCurrency(dish.price, {format: '%s%v', symbol: '$'})}</div>
      </div>
      {!!menu && showActions && dish.courseTypeId && <div className="actions">{getAction()}</div>}
    </div>
  );
};

DishHeader.propTypes = {
  dish: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default React.memo(DishHeader);