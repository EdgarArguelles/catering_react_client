import './MainCourse.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {MultipleDishLoader} from 'app/common/components/content_loaders/ContentLoaders.react';
import DishesLoader from 'app/data/dishes/DishesLoader.react';
import DishThumbnail from './dish_thumbnail/DishThumbnail.react';
import AddDish from './add_dish/AddDish.react';

class MainCourse extends React.Component {
  static propTypes = {
    allDishes: PropTypes.object,
    dishes: PropTypes.array.isRequired,
  };

  getLoader = () => {
    return (
      <span className="loader">
        <Button><MultipleDishLoader/></Button>
        <Button><MultipleDishLoader/></Button>
      </span>
    );
  };

  getDishesList = category => {
    const {allDishes, dishes} = this.props;

    return () => dishes.filter(dish => allDishes[dish.id].categories.map(c => c.name).includes(category))
      .map(dish => <DishThumbnail key={dish.id} dish={allDishes[dish.id]}/>);
  };

  render() {
    const {dishes} = this.props;
    const sections = ['Proteina', 'Guarnición'];

    return (
      <div id="main-course">
        {sections.map((section, index) => (
          <div key={index}>
            <h3>{section}</h3>
            <DishesLoader dishes={dishes} loader={this.getLoader()} renderer={this.getDishesList(section)}/>
            <AddDish dishCategory={section}/>
            {index < sections.length - 1 && <Divider className="main-course-divider"/>}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allDishes: state.data.dishes,
    dishes: state.quotations.multipleDishesDialog.dishes,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCourse);