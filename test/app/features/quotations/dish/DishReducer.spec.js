/* eslint-disable max-lines */
import DishReducer, {selectDish} from 'app/features/quotations/dish/DishReducer';

describe('Quotations -> Dish -> Reduce<r/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
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

      const result = DishReducer(undefined, {type: 'invalid'});

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

    it('should change selected value when action is selectDish and showActions is not present', () => {
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
        showActions: true,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const action = {type: selectDish.type, payload: {dishId: '123'}};

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

    it('should change selected value when action is selectDish and showActions is present', () => {
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
        selected: '123',
        showActions: false,
        filter: {
          isDialogOpen: false,
          search: 'test',
          sort: 'price',
          categories: ['cat1', 'cat2'],
        },
      };
      const action = {type: selectDish.type, payload: {dishId: '123', showActions: false}};

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