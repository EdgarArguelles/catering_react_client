/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/features/quotations/dish/DishActions';
import DishReducer from 'app/features/quotations/dish/DishReducer';

describe('Quotations -> Dish -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      selected: '',
      showActions: true,
      filter: {
        isDialogOpen: false,
        search: '',
        sort: 'name',
        categories: null,
      },
    };

    const result = DishReducer();

    expect(result).toStrictEqual(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      selected: 'abc',
      showActions: true,
      filter: {
        isDialogOpen: false,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      },
    };

    const result = DishReducer(state, {type: 'invalid'});

    expect(result).toStrictEqual(state);
    // don't mutate
    expect(state).toStrictEqual({
      selected: 'abc',
      showActions: true,
      filter: {
        isDialogOpen: false,
        search: 'test',
        sort: 'price',
        categories: ['cat1', 'cat2'],
      },
    });
  });

  describe('selected', () => {
    it('should change selected value when action is SELECT_DISH', () => {
      const state = {
        selected: 'abc',
        showActions: false,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const stateExpected = {
        selected: '123',
        showActions: false,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const action = {type: ACTION_TYPES.SELECT_DISH, payload: {dishId: '123', showActions: false}};

      const result = DishReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        selected: 'abc',
        showActions: false,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      });
    });
  });

  describe('showActions', () => {
    it('should change showActions value when action is SELECT_DISH', () => {
      const state = {
        selected: 'abc',
        showActions: true,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const stateExpected = {
        selected: 'abc',
        showActions: false,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const action = {type: ACTION_TYPES.SELECT_DISH, payload: {dishId: 'abc', showActions: false}};

      const result = DishReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        selected: 'abc',
        showActions: true,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      });
    });
  });
});