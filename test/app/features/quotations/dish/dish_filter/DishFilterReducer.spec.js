/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/features/quotations/dish/dish_filter/DishFilterActions';
import DishFilterReducer from 'app/features/quotations/dish/dish_filter/DishFilterReducer';

describe('Quotations -> Dish -> Filter -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      isDialogOpen: false,
      search: '',
      sort: 'name',
      categories: null,
    };

    const result = DishFilterReducer();

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

  it('should clean all values when action is DISH_FILTER_CLEAN_ALL', () => {
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
    const action = {type: ACTION_TYPES.DISH_FILTER_CLEAN_ALL};

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

  describe('isDialogOpen', () => {
    it('should set isDialogOpen to true when action is DISH_FILTER_DIALOG_OPEN', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_DIALOG_OPEN};

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

    it('should set isDialogOpen to false when action is DISH_FILTER_DIALOG_CLOSE', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_DIALOG_CLOSE};

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
  });

  describe('search', () => {
    it('should change search value when action is DISH_FILTER_SEARCH', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_SEARCH, payload: {search: '123'}};

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
  });

  describe('sort', () => {
    it('should change sort value when action is DISH_FILTER_SORT', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_SORT, payload: {sort: 'price'}};

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
  });

  describe('categories', () => {
    it('should set categories when action is DISH_FILTER_SET_CATEGORIES', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_SET_CATEGORIES, payload: {categories: ['aa1', 'aa2', 'aa3']}};

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
      const action = {type: ACTION_TYPES.DISH_FILTER_ADD_CATEGORY, payload: {category: 'cat3'}};

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

    it('should remove a category when action is DISH_FILTER_REMOVE_CATEGORY and category exist', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY, payload: {category: 'cat2'}};

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

    it('should keep same value when action is DISH_FILTER_REMOVE_CATEGORY and category does not exist', () => {
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
      const action = {type: ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY, payload: {category: 'cat 2'}};

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