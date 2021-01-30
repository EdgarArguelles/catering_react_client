import './MainCourse.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import {useDishesByIds} from 'app/hooks/data/Dishes';
import DishThumbnail from './dish_thumbnail/DishThumbnail';
import AddDish from './add_dish/AddDish';

const MainCourse = () => {
  const multipleDishes = useSelector(state => state.quotations.multipleDishesDialog.dishes);
  const results = useDishesByIds(multipleDishes.map(dish => dish.id));
  const dishes = results.filter(result => result.data).map(result => result.data);
  const isAnyLoading = !!results.filter(result => result.isLoading).map(result => result.isLoading).length;
  const sections = ['Proteina', 'Guarnición'];

  const getLoader = () => {
    return (
      <span className="loader">
        <Button><Skeleton variant="rect" animation="wave" className="loader-box"/></Button>
        <Button><Skeleton variant="rect" animation="wave" className="loader-box"/></Button>
      </span>
    );
  };

  const getDishesList = category => {
    return dishes.filter(dish => dish.categories.map(c => c.name).includes(category))
      .map(dish => <DishThumbnail key={dish.id} dish={dish}/>);
  };

  return (
    <div id="main-course">
      {sections.map((section, index) => (
        <div key={index}>
          <h3>{section}</h3>
          {isAnyLoading ? getLoader() : getDishesList(section)}
          <AddDish dishCategory={section}/>
          {index < sections.length - 1 && <Divider className="main-course-divider"/>}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MainCourse);