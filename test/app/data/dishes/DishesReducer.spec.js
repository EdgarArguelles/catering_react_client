/* eslint-disable max-lines */
import sinon from 'sinon';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';
import dishesReducer, {fetchDish, fetchDishes} from 'app/data/dishes/DishesReducer';

describe('Data -> Dishes -> Reducer/Actions', () => {
  describe('Reducer', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when undefined', () => {
      const state = {data: null, fetching: {}};

      const result = dishesReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
        fetching: {a: true, b: false},
      };

      const result = dishesReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
        fetching: {a: true, b: false},
      });
    });

    it('should load Dishes when action is fetchDishes.fulfilled and data is null', () => {
      const state = {data: null, fetching: {}};
      const dataExpected = 'mocked1';
      const data = [
        {id: 'id-3', name: 'abc', courseTypeId: 'old'},
        {id: 'id-5', name: 'abc2'},
        {id: 'id-6', name: 'abc3'},
      ];
      const action = {type: fetchDishes.fulfilled.type, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-3', name: 'abc', courseTypeId: 'ct1'},
        {id: 'id-5', name: 'abc2', courseTypeId: 'ct1'},
        {id: 'id-6', name: 'abc3', courseTypeId: 'ct1'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(dataExpected);

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual({data: dataExpected, fetching: {}});
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, mixData);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {}});
    });

    it('should not load new Dishes when action is fetchDishes.fulfilled and response is empty', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        }, fetching: {},
      };
      const dataExpected = 'mocked2';
      const data = [];
      const action = {type: fetchDishes.fulfilled.type, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        {id: 'id-4'},
        {id: 'id-5'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(dataExpected);

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual({data: dataExpected, fetching: {}});
      sinon.assert.callCount(arrayToObjectStub, 1);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        }, fetching: {},
      });
    });

    it('should load Dishes when action is fetchDishes.fulfilled', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        },
        fetching: {},
      };
      const dataExpected = 'mocked3';
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-2', name: 'abc3'}];
      const action = {type: fetchDishes.fulfilled.type, payload: {courseTypeId: 'ct1', data}};
      const mixData = [
        {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
        {id: 'id-4'},
        {id: 'id-5'},
        {id: 'id-3', name: 'abc', courseTypeId: 'ct1'},
        {id: 'id-5', name: 'abc2', courseTypeId: 'ct1'},
        {id: 'id-2', name: 'abc3', courseTypeId: 'ct1'},
      ];
      arrayToObjectStub.withArgs(mixData).returns(dataExpected);

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual({data: dataExpected, fetching: {}});
      sinon.assert.callCount(arrayToObjectStub, 1);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', name: 'old', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        },
        fetching: {},
      });
    });

    it('should get the same original status when action is fetchDish.fulfilled and dish is present', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
        },
        fetching: {aa: true, b: false},
      };
      const data = {id: 'id-3', name: 'abc'};
      const action = {type: fetchDish.fulfilled.type, payload: {dishId: 'id-3', data}};

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(state);
      sinon.assert.callCount(arrayToObjectStub, 0);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
        },
        fetching: {aa: true, b: false},
      });
    });

    it('should add a Dish when action is fetchDish.fulfilled and dish is not present', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
        },
        fetching: {aa: true, b: false, 'id-5': true},
      };
      const stateExpected = {
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5', name: 'abc'},
        },
        fetching: {aa: true, b: false},
      };
      const data = {id: 'id-5', name: 'abc'};
      const action = {type: fetchDish.fulfilled.type, payload: {dishId: 'id-5', data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', courseTypeId: 'ct1'},
          'id-2': {id: 'id-2', courseTypeId: 'ct2'},
          'id-3': {id: 'id-3', name: '123', courseTypeId: 'ct1'},
          'id-4': {id: 'id-4'},
        },
        fetching: {aa: true, b: false, 'id-5': true},
      });
    });

    it('should add a Dish when action is fetchDish.fulfilled and data is null', () => {
      const state = {data: null, fetching: {aa: true, b: false}};
      const stateExpected = {
        data: {'id-5': {id: 'id-5', name: 'abc'}},
        fetching: {aa: true, b: false},
      };
      const data = {id: 'id-5', name: 'abc'};
      const action = {type: fetchDish.fulfilled.type, payload: {dishId: 'id-5', data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {aa: true, b: false}});
    });

    it('should remove a true when action is fetchDish.rejected', () => {
      const state = {data: null, fetching: {bb: true}};
      const stateExpected = {data: null, fetching: {}};
      const action = {type: fetchDish.rejected.type, meta: {arg: 'bb'}};

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {bb: true}});
    });

    it('should get the same original status when action is fetchDish.rejected and dishId does not exist', () => {
      const state = {data: null, fetching: {cc: true}};
      const stateExpected = {data: null, fetching: {cc: true}};
      const action = {type: fetchDish.rejected.type, meta: {arg: 'bb'}};

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {cc: true}});
    });

    it('should add a true when action is fetchDish.pending', () => {
      const state = {data: null, fetching: {a: true, b: false}};
      const stateExpected = {data: null, fetching: {a: true, b: false, abc: true}};
      const action = {type: fetchDish.pending.type, meta: {arg: 'abc'}};

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {a: true, b: false}});
    });

    it('should overwrite a true when action is fetchDish.pending', () => {
      const state = {data: null, fetching: {a: true, b: false, abc: false}};
      const stateExpected = {data: null, fetching: {a: true, b: false, abc: true}};
      const action = {type: fetchDish.pending.type, meta: {arg: 'abc'}};

      const result = dishesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({data: null, fetching: {a: true, b: false, abc: false}});
    });
  });

  describe('Actions', () => {
    const dispatchStub = sinon.stub();
    const graphqlStub = sinon.stub(Api, 'graphql');
    const FIELDS = 'id name description picture price status categories{name}';

    afterEach(() => {
      dispatchStub.reset();
      graphqlStub.reset();
    });

    describe('fetchDishes', () => {
      const arg = 8;
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: `{courseType(id: ${arg}) {activeDishes{${FIELDS}}}}`};

      it('should dispatch fetchDishes.fulfilled', async () => {
        const jsonExpected = {data: {courseType: {activeDishes: [1, 2, 3]}}};
        const payload = {courseTypeId: arg, data: [1, 2, 3]};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await fetchDishes(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(payload);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDishes.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDishes.fulfilled.type, payload, meta});
        // don't mutate
        expect(arg).toStrictEqual(8);
      });

      it('should dispatch fetchDishes.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await fetchDishes(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDishes.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchDishes.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual(8);
      });
    });

    describe('fetchDish', () => {
      const arg = 8;
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: `{dish(id: ${arg}) {${FIELDS}}}`};

      it('should dispatch fetchDish.fulfilled', async () => {
        const jsonExpected = {data: {dish: {value: 'test'}}};
        const payload = {dishId: arg, data: {value: 'test'}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await fetchDish(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(payload);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDish.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDish.fulfilled.type, payload, meta});
        // don't mutate
        expect(arg).toStrictEqual(8);
      });

      it('should dispatch fetchDish.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await fetchDish(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchDish.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchDish.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual(8);
      });
    });
  });
});