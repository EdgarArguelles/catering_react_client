/* eslint-disable max-lines */
import DishFilterActions, {ACTION_TYPES} from 'app/features/quotations/dish/dish_filter/DishFilterActions';

describe('Quotations -> Dish -> Filter -> Actions', () => {
  describe('openDishFilterDialog', () => {
    it('should dispatch DISH_FILTER_DIALOG_OPEN', () => {
      const result = DishFilterActions.openDishFilterDialog();

      expect(result).toStrictEqual({type: ACTION_TYPES.DISH_FILTER_DIALOG_OPEN});
    });
  });

  describe('closeDishFilterDialog', () => {
    it('should dispatch DISH_FILTER_DIALOG_CLOSE', () => {
      const result = DishFilterActions.closeDishFilterDialog();

      expect(result).toStrictEqual({type: ACTION_TYPES.DISH_FILTER_DIALOG_CLOSE});
    });
  });

  describe('cleanFilters', () => {
    it('should dispatch DISH_FILTER_CLEAN_ALL', () => {
      const result = DishFilterActions.cleanFilters();

      expect(result).toStrictEqual({type: ACTION_TYPES.DISH_FILTER_CLEAN_ALL});
    });
  });

  describe('changeSearch', () => {
    it('should dispatch DISH_FILTER_SEARCH', () => {
      const search = 'test';

      const result = DishFilterActions.changeSearch(search);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DISH_FILTER_SEARCH,
        payload: {
          search,
        },
      });
      // don't mutate
      expect(search).toStrictEqual('test');
    });
  });

  describe('changeSort', () => {
    it('should dispatch DISH_FILTER_SORT', () => {
      const sort = 'test';

      const result = DishFilterActions.changeSort(sort);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DISH_FILTER_SORT,
        payload: {
          sort,
        },
      });
      // don't mutate
      expect(sort).toStrictEqual('test');
    });
  });

  describe('setCategories', () => {
    it('should dispatch DISH_FILTER_SET_CATEGORIES', () => {
      const categories = 'test';

      const result = DishFilterActions.setCategories(categories);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DISH_FILTER_SET_CATEGORIES,
        payload: {
          categories,
        },
      });
      // don't mutate
      expect(categories).toStrictEqual('test');
    });
  });

  describe('addCategory', () => {
    it('should dispatch DISH_FILTER_ADD_CATEGORY', () => {
      const category = 'test';

      const result = DishFilterActions.addCategory(category);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DISH_FILTER_ADD_CATEGORY,
        payload: {
          category,
        },
      });
      // don't mutate
      expect(category).toStrictEqual('test');
    });
  });

  describe('removeCategory', () => {
    it('should dispatch DISH_FILTER_REMOVE_CATEGORY', () => {
      const category = 'test';

      const result = DishFilterActions.removeCategory(category);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY,
        payload: {
          category,
        },
      });
      // don't mutate
      expect(category).toStrictEqual('test');
    });
  });
});