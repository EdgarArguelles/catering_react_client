import {expect} from 'chai';
import DishActions, {ACTION_TYPES} from '../../../../../src/app/features/quotations/dish/DishActions';

describe('Quotations -> Dish -> Actions', () => {
  describe('selectDish', () => {
    it('should dispatch SELECT_DISH with default showActions', () => {
      const dishId = 'test';

      const result = DishActions.selectDish(dishId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.SELECT_DISH,
        payload: {
          dishId,
          showActions: true,
        },
      });
      // don't mutate
      expect(dishId).to.deep.equal('test');
    });

    it('should dispatch SELECT_DISH', () => {
      const dishId = 'test';
      const showActions = false;

      const result = DishActions.selectDish(dishId, showActions);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.SELECT_DISH,
        payload: {
          dishId,
          showActions,
        },
      });
      // don't mutate
      expect(dishId).to.deep.equal('test');
      expect(showActions).to.deep.equal(false);
    });
  });
});