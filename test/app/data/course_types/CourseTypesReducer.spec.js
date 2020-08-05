/* eslint-disable max-lines */
import sinon from 'sinon';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';
import courseTypesReducer, {fetchCourseTypes, setCourseTypesData} from 'app/data/course_types/CourseTypesReducer';

describe('Data -> CourseTypes -> Reducer/Actions', () => {
  describe('Reducer', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when undefined', () => {
      const state = {data: null};

      const result = courseTypesReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      };

      const result = courseTypesReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      });
    });

    it('should load CourseTypes when action is setCourseTypesData', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      };
      const action = {type: setCourseTypesData.type, payload: {id: 5}};

      const result = courseTypesReducer(state, action);

      expect(result).toStrictEqual({data: {id: 5}});
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      });
    });

    it('should load CourseTypes when action is fetchCourseTypes.fulfilled', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      };
      const stateExpected = {
        data: {
          'id-3': {id: 'id-3', name: 'abc'},
          'id-5': {id: 'id-5', name: 'abc2'},
        },
      };
      const dataMocked = {
        'id-3': {id: 'id-3', name: 'abc'},
        'id-5': {id: 'id-5', name: 'abc2'},
      };
      const data = 'test';
      const action = {type: fetchCourseTypes.fulfilled.type, payload: {data: data}};
      arrayToObjectStub.withArgs(data).returns(dataMocked);

      const result = courseTypesReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, data);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1'},
          'id-2': {id: 'id-2', name: '123'},
          'id-3': {id: 'id-3'},
        },
      });
    });
  });

  describe('Actions', () => {
    const dispatchStub = sinon.stub();
    const graphqlStub = sinon.stub(Api, 'graphql');

    afterEach(() => {
      dispatchStub.reset();
      graphqlStub.reset();
    });

    describe('fetchCourseTypes', () => {
      const arg = null;
      const meta = {arg, requestId: sinon.match.string};
      const body = {query: '{activeCourseTypes {id name picture position status}}'};
      const versionBody = {query: '{version {version}}'};

      it('should dispatch fetchCourseTypes.fulfilled', async () => {
        const jsonExpected = {data: {activeCourseTypes: {value: 'test'}}};
        const versionJsonExpected = {data: {version: {version: 'version1'}}};
        const payload = {data: {value: 'test'}, metaData: {version: 'version1'}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
        graphqlStub.withArgs(dispatchStub, versionBody).returns(versionJsonExpected);

        const result = await fetchCourseTypes(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(payload);
        sinon.assert.callCount(graphqlStub, 2);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchCourseTypes.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchCourseTypes.fulfilled.type, payload, meta});
        // don't mutate
        expect(arg).toStrictEqual(null);
      });

      it('should dispatch fetchCourseTypes.rejected when version fails', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, versionBody).throws(errorExpected);

        const result = await fetchCourseTypes(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchCourseTypes.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchCourseTypes.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {arg, aborted: false, condition: false, requestId: sinon.match.string},
        });
        // don't mutate
        expect(arg).toStrictEqual(null);
      });

      it('should dispatch fetchCourseTypes.rejected when activeCourseTypes fails', async () => {
        const errorExpected = new Error('error 1');
        const versionJsonExpected = {data: {version: {version: 'version1'}}};
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
        graphqlStub.withArgs(dispatchStub, versionBody).returns(versionJsonExpected);

        const result = await fetchCourseTypes(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 2);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchCourseTypes.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchCourseTypes.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {arg, aborted: false, condition: false, requestId: sinon.match.string},
        });
        // don't mutate
        expect(arg).toStrictEqual(null);
      });
    });
  });
});