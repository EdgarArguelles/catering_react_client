/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import {ACTION_TYPES as DATA_ACTION_TYPES} from 'app/data/DataActions';
import {ACTION_TYPES} from 'app/data/dishes/DishesActions';
import {dishes, dishesFetching, dishFetching} from 'app/data/dishes/DishesReducer';
import Utils from 'app/common/Utils';

describe('Data -> Dishes -> Reducer', () => {
  describe('dishesFetching', () => {
    it('should get default state when empty', () => {
      const state = false;

      const result = dishesFetching();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = true;

      const result = dishesFetching(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get true when action is FETCH_DISHES_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.FETCH_DISHES_REQUEST};

      const result = dishesFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get false when action is FETCH_DISHES_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_DISHES_SUCCESS};

      const result = dishesFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is FETCH_DISHES_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_DISHES_ERROR};

      const result = dishesFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });
  });

  describe('dishFetching', () => {
    it('should get default state when empty', () => {
      const state = {};

      const result = dishFetching();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {a: true, b: false};

      const result = dishFetching(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal({a: true, b: false});
    });

    it('should add a true when action is FETCH_DISH_REQUEST', () => {
      const state = {a: true, b: false};
      const stateExpected = {a: true, b: false, abc: true};
      const action = {type: ACTION_TYPES.FETCH_DISH_REQUEST, payload: {dishId: 'abc'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({a: true, b: false});
    });

    it('should overwrite a true when action is FETCH_DISH_REQUEST', () => {
      const state = {a: true, b: false, abc: false};
      const stateExpected = {a: true, b: false, abc: true};
      const action = {type: ACTION_TYPES.FETCH_DISH_REQUEST, payload: {dishId: 'abc'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({a: true, b: false, abc: false});
    });

    it('should remove a true when action is FETCH_DISH_SUCCESS', () => {
      const state = {aa: true, b: false};
      const stateExpected = {b: false};
      const action = {type: ACTION_TYPES.FETCH_DISH_SUCCESS, payload: {dishId: 'aa'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({aa: true, b: false});
    });

    it('should remove a true when action is FETCH_DISH_ERROR', () => {
      const state = {bb: true};
      const stateExpected = {};
      const action = {type: ACTION_TYPES.FETCH_DISH_ERROR, payload: {dishId: 'bb'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({bb: true});
    });

    it('should get the same original status when action is FETCH_DISH_SUCCESS and dishId does not exist', () => {
      const state = {cc: true, aa: false};
      const stateExpected = {cc: true, aa: false};
      const action = {type: ACTION_TYPES.FETCH_DISH_SUCCESS, payload: {dishId: 'bb'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({cc: true, aa: false});
    });

    it('should get the same original status when action is FETCH_DISH_ERROR and dishId does not exist', () => {
      const state = {cc: true};
      const stateExpected = {cc: true};
      const action = {type: ACTION_TYPES.FETCH_DISH_ERROR, payload: {dishId: 'bb'}};

      const result = dishFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({cc: true});
    });
  });

  describe('dishes', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when empty', () => {
      const state = null;

      const result = dishes();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      };

      const result = dishes(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      });
    });

    it('should get null when action is DATA_CHANGE_VERSION', () => {
      const state = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const action = {type: DATA_ACTION_TYPES.DATA_CHANGE_VERSION};

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should load Dishes when action is FETCH_DISHES_SUCCESS and state is null', () => {
      const state = null;
      const stateExpected = 'mocked1';
      const data = [
        {id: 'id-3', name: 'abc', courseTypeId: 'old'},
        {id: 'id-5', name: 'abc2'},
        {id: 'id-6', name: 'abc3'},
      ];
      const action = {type: ACTION_TYPES.FETCH_DISHES_SUCCESS, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-3', name: 'abc', courseTypeId: 'ct1'},
        {id: 'id-5', name: 'abc2', courseTypeId: 'ct1'},
        {id: 'id-6', name: 'abc3', courseTypeId: 'ct1'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(stateExpected);

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, mixData);
      // don't mutate
      expect(state).to.deep.equal(null);
    });

    it('should not load new Dishes when action is FETCH_DISHES_SUCCESS and data is empty', () => {
      const state = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = 'mocked2';
      const data = [];
      const action = {type: ACTION_TYPES.FETCH_DISHES_SUCCESS, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        {id: 'id-4'},
        {id: 'id-5'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(stateExpected);

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, mixData);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should load Dishes when action is FETCH_DISHES_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = 'mocked3';
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-2', name: 'abc3'}];
      const action = {type: ACTION_TYPES.FETCH_DISHES_SUCCESS, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        {id: 'id-4'},
        {id: 'id-5'},
        {id: 'id-3', name: 'abc', courseTypeId: 'ct1'},
        {id: 'id-5', name: 'abc2', courseTypeId: 'ct1'},
        {id: 'id-2', name: 'abc3', courseTypeId: 'ct1'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(stateExpected);

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, mixData);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should get the same original status when action is FETCH_DISH_SUCCESS and dish is present', () => {
      const state = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
      };
      const data = {id: 'id-3', name: 'abc'};
      const action = {type: ACTION_TYPES.FETCH_DISH_SUCCESS, payload: {data}};

      const result = dishes(state, action);

      expect(result).to.deep.equal(state);
      sinon.assert.callCount(arrayToObjectStub, 0);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
      });
    });

    it('should add a Dish when action is FETCH_DISH_SUCCESS and dish is not present', () => {
      const state = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
      };
      const stateExpected = {
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5', name: 'abc'},
      };
      const data = {id: 'id-5', name: 'abc'};
      const action = {type: ACTION_TYPES.FETCH_DISH_SUCCESS, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', courseTypeId: 'ct1'},
        'id-2': {id: 'id-2', courseTypeId: 'ct2'},
        'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
        'id-4': {id: 'id-4'},
      });
    });

    it('should add a Dish when action is FETCH_DISH_SUCCESS and state is null', () => {
      const state = null;
      const stateExpected = {
        'id-5': {id: 'id-5', name: 'abc'},
      };
      const data = {id: 'id-5', name: 'abc'};
      const action = {type: ACTION_TYPES.FETCH_DISH_SUCCESS, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = dishes(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).to.deep.equal(null);
    });
  });
});