import {expect} from 'chai';
import DishFilterActions, {ACTION_TYPES}
  from '../../../../../../src/app/features/quotations/dish/dish_filter/DishFilterActions';

describe('Quotations -> Dish -> Filter -> Actions', () => {
  describe('cleanFilters', () => {
    it('should dispatch DISH_FILTER_CLEAN_ALL', () => {
      const result = DishFilterActions.cleanFilters();

      expect(result).to.deep.equal({type: ACTION_TYPES.DISH_FILTER_CLEAN_ALL});
    });
  });

  describe('changeSearch', () => {
    it('should dispatch DISH_FILTER_SEARCH', () => {
      const search = 'test';

      const result = DishFilterActions.changeSearch(search);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.DISH_FILTER_SEARCH,
        payload: {
          search,
        },
      });
      // don't mutate
      expect(search).to.deep.equal('test');
    });
  });

  describe('changeSort', () => {
    it('should dispatch DISH_FILTER_SORT', () => {
      const sort = 'test';

      const result = DishFilterActions.changeSort(sort);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.DISH_FILTER_SORT,
        payload: {
          sort,
        },
      });
      // don't mutate
      expect(sort).to.deep.equal('test');
    });
  });

  describe('setCategories', () => {
    it('should dispatch DISH_FILTER_SET_CATEGORIES', () => {
      const categories = 'test';

      const result = DishFilterActions.setCategories(categories);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.DISH_FILTER_SET_CATEGORIES,
        payload: {
          categories,
        },
      });
      // don't mutate
      expect(categories).to.deep.equal('test');
    });
  });

  describe('addCategory', () => {
    it('should dispatch DISH_FILTER_ADD_CATEGORY', () => {
      const category = 'test';

      const result = DishFilterActions.addCategory(category);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.DISH_FILTER_ADD_CATEGORY,
        payload: {
          category,
        },
      });
      // don't mutate
      expect(category).to.deep.equal('test');
    });
  });

  describe('removeCategory', () => {
    it('should dispatch DISH_FILTER_REMOVE_CATEGORY', () => {
      const category = 'test';

      const result = DishFilterActions.removeCategory(category);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY,
        payload: {
          category,
        },
      });
      // don't mutate
      expect(category).to.deep.equal('test');
    });
  });
});