/* eslint-disable max-lines */
import multipleDishesDialogReducer, {
  addDish,
  cleanDishes,
  closeDialog,
  openDialog,
  removeDish,
} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

describe('Quotations -> Course Type -> Multiple Dishes Dialog -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [],
      };

      const result = multipleDishesDialogReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };

      const result = multipleDishesDialogReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should change isMultipleDishesDialogOpen to true when action is openDialog', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const action = {type: openDialog.type};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should change isMultipleDishesDialogOpen to false when action is closeDialog', () => {
      const state = {
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const action = {type: closeDialog.type};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: true,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should clean dishes when action is cleanDishes', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [],
      };
      const action = {type: cleanDishes.type};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should add a dish when action is addDish', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}, {id: 'id 4'}],
      };
      const action = {type: addDish.type, payload: 'id 4'};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should remove a dish when action is removeDish', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 3'}],
      };
      const action = {type: removeDish.type, payload: 'id 2'};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });

    it('should get the same status when remove is not found when action is removeDish', () => {
      const state = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const stateExpected = {
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      };
      const action = {type: removeDish.type, payload: 'id 4'};

      const result = multipleDishesDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isMultipleDishesDialogOpen: false,
        dishes: [{id: 'id 1'}, {id: 'id 2'}, {id: 'id 3'}],
      });
    });
  });
});