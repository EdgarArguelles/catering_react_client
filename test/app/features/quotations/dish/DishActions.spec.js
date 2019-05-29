import DishActions, {ACTION_TYPES} from 'app/features/quotations/dish/DishActions';

describe('Quotations -> Dish -> Actions', () => {
  describe('selectDish', () => {
    it('should dispatch SELECT_DISH with default showActions', () => {
      const dishId = 'test';

      const result = DishActions.selectDish(dishId);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.SELECT_DISH,
        payload: {
          dishId,
          showActions: true,
        },
      });
      // don't mutate
      expect(dishId).toStrictEqual('test');
    });

    it('should dispatch SELECT_DISH', () => {
      const dishId = 'test';
      const showActions = false;

      const result = DishActions.selectDish(dishId, showActions);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.SELECT_DISH,
        payload: {
          dishId,
          showActions,
        },
      });
      // don't mutate
      expect(dishId).toStrictEqual('test');
      expect(showActions).toStrictEqual(false);
    });
  });
});