import './Dish.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Utils from '../../../common/Utils';

export default class Dish extends React.Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
  };

  render() {
    const {dish} = this.props;

    return (
      <div id="dish">
        <Card raised className="card">
          <CardMedia className="media" image={Utils.getDriveImage(dish.picture)}/>
          <CardContent>
            <p className="description">{dish.description}</p>
            {dish.categories.map(category => <Chip key={category.name} component="span" label={category.name}/>)}
          </CardContent>
        </Card>
      </div>
    );
  }
}