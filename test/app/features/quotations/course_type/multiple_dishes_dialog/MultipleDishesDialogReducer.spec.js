/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import MultipleDishesDialogReducer
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

describe('Quotations -> Course Type -> Multiple Dishes Dialog -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      isMultipleDishesDialogOpen: false,
      dishes: [],
    };

    const result = MultipleDishesDialogReducer();

    expect(result).toStrictEqual(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      isMultipleDishesDialogOpen: true,
      dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
    };

    const result = MultipleDishesDialogReducer(state, {type: 'invalid'});

    expect(result).toStrictEqual(state);
    // don't mutate
    expect(state).toStrictEqual({
      isMultipleDishesDialogOpen: true,
      dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
    });
  });

  describe('isMultipleDishesDialogOpen', () => {
    it('should change isMultipleDishesDialogOpen value when action is CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const action = {
        type: ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN,
        payload: {isMultipleDishesDialogOpen: true},
      };

      const result = MultipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });
  });

  describe('dishes', () => {
    it('should clean dishes when action is CLEAN_MULTIPLE_DISHES_DISHES', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [],
      };
      const action = {type: ACTION_TYPES.CLEAN_MULTIPLE_DISHES_DISHES};

      const result = MultipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should add a dish when action is ADD_MULTIPLE_DISHES_DISH', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}, {id: 'id 4'}],
      };
      const action = {type: ACTION_TYPES.ADD_MULTIPLE_DISHES_DISH, payload: {dishId: 'id 4'}};

      const result = MultipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should remove a dish when action is REMOVE_MULTIPLE_DISHES_DISH', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 3'}],
      };
      const action = {type: ACTION_TYPES.REMOVE_MULTIPLE_DISHES_DISH, payload: {dishId: 'id 2'}};

      const result = MultipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should get the same status when remove is not found when action is REMOVE_MULTIPLE_DISHES_DISH', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const action = {type: ACTION_TYPES.REMOVE_MULTIPLE_DISHES_DISH, payload: {dishId: 'id 4'}};

      const result = MultipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });
  });
});