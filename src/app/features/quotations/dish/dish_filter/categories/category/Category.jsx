import './Category.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { addCategory, removeCategory, setCategories } from 'app/features/quotations/dish/dish_filter/DishFilterReducer';

const Category = ({ category, categories, isAllSelected }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.quotations.dish.filter);
  const handleSetCategories = newCategories => dispatch(setCategories(newCategories));

  const handleChangeCategory = () => {
    const categoriesWithoutThis = categories.filter(c => c !== category);

    if (filter.categories === null) {
      handleSetCategories(categoriesWithoutThis);
      return;
    }

    if (filter.categories.includes(category)) {
      dispatch(removeCategory(category));
    } else if (categoriesWithoutThis.length === filter.categories.length) {
      // adding this category, all categories will be selected, so set null instead to indicate category is not required
      handleSetCategories(null);
    } else {
      dispatch(addCategory(category));
    }
  };

  return (
    <>
      <Switch className="filter-category" color="primary" onChange={handleChangeCategory}
        checked={isAllSelected || filter.categories.includes(category)}/>
      {category}
    </>
  );
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
};

export default React.memo(Category);