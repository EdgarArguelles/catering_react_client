import './DishThumbnail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';
import Image from 'app/common/components/image/Image';
import DishActions from 'app/features/quotations/dish/DishActions';

const DishThumbnail = ({dish}) => {
  const dispatch = useDispatch();
  const selectDish = () => dispatch(DishActions.selectDish(dish.id));

  return (
    <Button className="dish-thumbnail" onClick={selectDish}>
      <Image className="dish-image" src={Utils.getDriveImage(dish.picture)} alt={dish.name}/>
    </Button>
  );
};

DishThumbnail.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default React.memo(DishThumbnail);