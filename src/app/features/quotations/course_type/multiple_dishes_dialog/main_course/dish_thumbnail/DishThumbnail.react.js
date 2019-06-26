import './DishThumbnail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';
import Image from 'app/common/components/image/Image';
import DishActions from 'app/features/quotations/dish/DishActions';

class DishThumbnail extends React.Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
    selectDish: PropTypes.func.isRequired,
  };

  render() {
    const {dish, selectDish} = this.props;

    return (
      <Button className="dish-thumbnail" onClick={() => selectDish(dish.id)}>
        <Image className="dish-image" src={Utils.getDriveImage(dish.picture)}/>
      </Button>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    selectDish: dishId => {
      dispatch(DishActions.selectDish(dishId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishThumbnail);