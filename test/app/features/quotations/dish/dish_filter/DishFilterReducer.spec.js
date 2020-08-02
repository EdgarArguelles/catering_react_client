/* eslint-disable max-lines */
import DishFilterReducer, {
  addCategory,
  changeSearch,
  changeSort,
  cleanFilters,
  closeDishFilterDialog,
  openDishFilterDialog,
  removeCategory,
  setCategories,
} from 'app/features/quotations/dish/dish_filter/DishFilterReducer';

describe('Quotations -> Dish -> Filter -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        isDialogOpen: false,
        search: '',
        sort: 'name',
        categories: null,
      };

      const result = DishFilterReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };

      const result = DishFilterReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should clean all values when action is cleanFilters', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: '',
        sort: 'name',
        categories: null,
      };
      const action = {type: cleanFilters.type};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should set isDialogOpen to true when action is openDishFilterDialog', () => {
      const state = {
        isDialogOpen: false,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const action = {type: openDishFilterDialog.type};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: false,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should set isDialogOpen to false when action is closeDishFilterDialog', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: false,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const action = {type: closeDishFilterDialog.type};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should change search value when action is changeSearch', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: '123',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const action = {type: changeSearch.type, payload: '123'};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should change sort value when action is changeSort', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'name',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const action = {type: changeSort.type, payload: 'price'};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'name',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should set categories when action is setCategories', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['aa1', 'aa2', 'aa3'],
      };
      const action = {type: setCategories.type, payload: ['aa1', 'aa2', 'aa3']};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should add a category when action is DISH_FILTER_ADD_CATEGORY', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      };
      const action = {type: addCategory.type, payload: 'cat3'};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      });
    });

    it('should remove a category when action is removeCategory and category exist', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat3'],
      };
      const action = {type: removeCategory.type, payload: 'cat2'};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      });
    });

    it('should keep same value when action is removeCategory and category does not exist', () => {
      const state = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      };
      const stateExpected = {
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      };
      const action = {type: removeCategory.type, payload: 'cat 2'};

      const result = DishFilterReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isDialogOpen: true,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2', 'cat3'],
      });
    });
  });
});