import './DishGrid.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Utils from '../../../../../common/Utils';
import Animate from '../../../../../common/components/animate/Animate.react';
import {DishLoader} from '../../../../../common/components/content_loaders/ContentLoaders.react';
import DishItem from '../dish_item/DishItem.react';

class DishGrid extends React.Component {
  static propTypes = {
    dishes: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
  };

  getSort = () => {
    const {filter: {sort}} = this.props;

    switch (sort) {
      case 'price':
        return (a, b) => a.price - b.price;
      case 'name':
        return Utils.getSortString('name');
      default:
        return () => 0;
    }
  };

  isDishVisible = dish => {
    const {filter: {search, categories}} = this.props;
    if (search !== '' && !dish.name.toUpperCase().includes(search.toUpperCase())) {
      return false;
    }

    if (categories && categories.length >= 0 && !dish.categories.some(category => categories.includes(category.name))) {
      return false;
    }

    return true;
  };

  getContentLoader = () => {
    if (!this.props.isLoading) {
      return null;
    }

    return Array(12).fill('loader').map((value, index) =>
      <Grid key={`${value}-${index}`} item xs={6} sm={4} md={4} lg={3} xl={2}><DishLoader/></Grid>);
  };

  render() {
    const {dishes} = this.props;

    return (
      <Grid id="dish-grid" container spacing={16} justify="flex-start">
        {this.getContentLoader()}
        {[...dishes].sort(this.getSort()).map(dish => (
          <Animate key={dish.id} visible={this.isDishVisible(dish)} animationIn="fadeInDown" animationOut="fadeOutUp"
                   delayOut={400}>
            <Grid item xs={6} sm={4} md={4} lg={3} xl={2}><DishItem dish={dish}/></Grid>
          </Animate>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.quotations.dish.filter,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DishGrid);