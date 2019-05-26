import './Category.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Switch from '@material-ui/core/Switch';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

class Category extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isAllSelected: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    setCategories: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
  };

  handleChangeCategory = () => {
    const {category, categories, filter, setCategories, addCategory, removeCategory} = this.props;
    const categoriesWithoutThis = categories.filter(c => c !== category);

    if (filter.categories === null) {
      setCategories(categoriesWithoutThis);
      return;
    }

    if (filter.categories.includes(category)) {
      removeCategory(category);
    } else if (categoriesWithoutThis.length === filter.categories.length) {
      // adding this category, all categories will be selected, so set null instead to indicate category is not required
      setCategories(null);
    } else {
      addCategory(category);
    }
  };

  render() {
    const {category, isAllSelected, filter} = this.props;

    return (
      <React.Fragment>
        <Switch className="filter-category" color="primary"
                checked={isAllSelected || filter.categories.includes(category)} onChange={this.handleChangeCategory}/>
        {category}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.quotations.dish.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategories: categories => {
      dispatch(DishFilterActions.setCategories(categories));
    },
    addCategory: category => {
      dispatch(DishFilterActions.addCategory(category));
    },
    removeCategory: category => {
      dispatch(DishFilterActions.removeCategory(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);