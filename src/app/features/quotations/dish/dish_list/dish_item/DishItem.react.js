import './DishItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import formatCurrency from 'format-currency';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Utils from '../../../../../common/Utils';
import Image from '../../../../../common/components/image/Image.react';
import {isDishAdded} from '../../Dish.service';
import DishActions from '../../DishActions';

class DishItem extends React.Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
    multipleDishesDialog: PropTypes.object.isRequired,
    menuCourses: PropTypes.array.isRequired,
    selectDish: PropTypes.func.isRequired,
  };

  render() {
    const {dish, multipleDishesDialog, menuCourses, selectDish} = this.props;

    return (
      <Paper className="dish-item" elevation={8}>
        {isDishAdded(multipleDishesDialog, menuCourses, dish.id) &&
        <i className="added fas fa-check-circle" aria-hidden="true"/>}
        <ButtonBase focusRipple className="dish-btn" onClick={() => selectDish(dish.id)}>
          <Image className="image" smallLoading={true} src={Utils.getDriveImage(dish.picture)}/>
          <div className="image-content image-backdrop"/>
          <div className="image-content">
            <div className="image-info">
              <p className="image-title">{dish.name}</p>
              <p className="image-subtitle">{formatCurrency(dish.price, {format: '%s%v', symbol: '$'})}</p>
            </div>
            <div className="image-action">
              <i className="fas fa-info-circle info-icon" aria-hidden="true"/>
            </div>
          </div>
        </ButtonBase>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    multipleDishesDialog: state.quotations.multipleDishesDialog,
    menuCourses: state.quotations.quotation.menus.find(menu => menu.isSelected).courses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDish: dishId => {
      dispatch(DishActions.selectDish(dishId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishItem);