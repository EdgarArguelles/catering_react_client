/* eslint-disable max-lines */
import sinon from 'sinon';
import Api from 'app/common/Api';
import DishesActions, {ACTION_TYPES} from 'app/data/dishes/DishesActions';

describe('Data -> Dishes -> Actions', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');
  const FIELDS = 'id name description picture price status categories{name}';

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
  });

  describe('fetchDishes', () => {
    const courseTypeId = 8;
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};

    it('should dispatch FETCH_DISHES_REQUEST and FETCH_DISHES_SUCCESS', async () => {
      const jsonExpected = {data: {courseType: {activeDishes: [1, 2, 3]}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await DishesActions.fetchDishes(courseTypeId)(dispatchStub);

      expect(result).toStrictEqual(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_DISHES_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_DISHES_SUCCESS,
        payload: {
          courseTypeId,
          data: [1, 2, 3],
        },
      });
      // don't mutate
      expect(courseTypeId).toStrictEqual(8);
    });

    it('should dispatch FETCH_DISHES_REQUEST and FETCH_DISHES_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await DishesActions.fetchDishes(courseTypeId)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).toStrictEqual(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_DISHES_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_DISHES_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(courseTypeId).toStrictEqual(8);
      }
    });
  });

  describe('fetchDish', () => {
    const dishId = 8;
    const body = {query: `{dish(id: ${dishId}) {${FIELDS}}}`};

    it('should dispatch FETCH_DISH_REQUEST and FETCH_DISH_SUCCESS', async () => {
      const jsonExpected = {data: {dish: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await DishesActions.fetchDish(dishId)(dispatchStub);

      expect(result).toStrictEqual(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_DISH_REQUEST, payload: {dishId}});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_DISH_SUCCESS,
        payload: {
          dishId,
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(dishId).toStrictEqual(8);
    });

    it('should dispatch FETCH_DISH_REQUEST and FETCH_DISH_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await DishesActions.fetchDish(dishId)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).toStrictEqual(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_DISH_REQUEST, payload: {dishId}});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_DISH_ERROR,
          error: true,
          payload: {dishId, error},
        });
        // don't mutate
        expect(dishId).toStrictEqual(8);
      }
    });
  });
});