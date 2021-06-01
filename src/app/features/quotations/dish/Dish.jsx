import './Dish.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Utils from 'app/common/Utils';
import Image from 'app/common/components/image/Image';
import { useIsMobileSize } from 'app/hooks/Common';
import DishActions from 'app/features/quotations/dish/dish_actions/DishActions';

const Dish = ({ dish }) => {
  const fullScreen = useIsMobileSize();

  return (
    <div id="dish">
      <Card raised className="card">
        <Image className="media" alt={dish.name} src={Utils.getDriveImage(dish.picture)}/>
        <CardContent>
          <p className="description">{dish.description}</p>
          {dish.categories.length > 0 && <div className="sub-title">
            <hr/>
            Categoria</div>}
          {dish.categories.map(category => <Chip key={category.name} component="span" label={category.name}/>)}
          {fullScreen && <DishActions dish={dish}/>}
        </CardContent>
      </Card>
    </div>
  );
};

Dish.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default React.memo(Dish);