import './MainCourse.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {MultipleDishLoader} from 'app/common/components/content_loaders/ContentLoaders';
import DishThumbnail from './dish_thumbnail/DishThumbnail';
import AddDish from './add_dish/AddDish';

const MainCourse = () => {
  const allDishes = useSelector(state => state.data.dishes.data);
  const dishes = useSelector(state => state.quotations.multipleDishesDialog.dishes);
  const areDishesLoaded = useAreDishesLoaded(dishes);
  const sections = ['Proteina', 'Guarnición'];

  const getLoader = () => {
    return (
      <span className="loader">
        <Button><MultipleDishLoader/></Button>
        <Button><MultipleDishLoader/></Button>
      </span>
    );
  };

  const getDishesList = category => {
    return dishes.filter(dish => allDishes[dish.id].categories.map(c => c.name).includes(category))
      .map(dish => <DishThumbnail key={dish.id} dish={allDishes[dish.id]}/>);
  };

  return (
    <div id="main-course">
      {sections.map((section, index) => (
        <div key={index}>
          <h3>{section}</h3>
          {areDishesLoaded ? getDishesList(section) : getLoader()}
          <AddDish dishCategory={section}/>
          {index < sections.length - 1 && <Divider className="main-course-divider"/>}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MainCourse);