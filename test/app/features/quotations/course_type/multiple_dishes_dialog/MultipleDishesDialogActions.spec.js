import {expect} from 'chai';
import MultipleDishesDialogActions, {ACTION_TYPES}
  from '../../../../../../src/app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';

describe('Quotations -> Course Type -> Multiple Dishes Dialog -> Actions', () => {
  describe('openDialog', () => {
    it('should dispatch CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN', () => {
      const result = MultipleDishesDialogActions.openDialog();

      expect(result).to.deep.equal({
        type: ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN,
        payload: {
          isMultipleDishesDialogOpen: true,
        },
      });
    });
  });

  describe('closeDialog', () => {
    it('should dispatch CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN', () => {
      const result = MultipleDishesDialogActions.closeDialog();

      expect(result).to.deep.equal({
        type: ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN,
        payload: {
          isMultipleDishesDialogOpen: false,
        },
      });
    });
  });

  describe('cleanDishes', () => {
    it('should dispatch CLEAN_MULTIPLE_DISHES_DISHES', () => {
      const result = MultipleDishesDialogActions.cleanDishes();

      expect(result).to.deep.equal({type: ACTION_TYPES.CLEAN_MULTIPLE_DISHES_DISHES});
    });
  });

  describe('addDish', () => {
    it('should dispatch ADD_MULTIPLE_DISHES_DISH', () => {
      const dishId = 'test';

      const result = MultipleDishesDialogActions.addDish(dishId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.ADD_MULTIPLE_DISHES_DISH,
        payload: {
          dishId,
        },
      });
      // don't mutate
      expect(dishId).to.deep.equal('test');
    });
  });

  describe('removeDish', () => {
    it('should dispatch REMOVE_MULTIPLE_DISHES_DISH', () => {
      const dishId = 'test';

      const result = MultipleDishesDialogActions.removeDish(dishId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.REMOVE_MULTIPLE_DISHES_DISH,
        payload: {
          dishId,
        },
      });
      // don't mutate
      expect(dishId).to.deep.equal('test');
    });
  });
});