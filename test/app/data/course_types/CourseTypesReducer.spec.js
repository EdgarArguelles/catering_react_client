/* eslint-disable max-lines */
import sinon from 'sinon';
import {ACTION_TYPES} from 'app/data/course_types/CourseTypesActions';
import {courseTypes, courseTypesFetching} from 'app/data/course_types/CourseTypesReducer';
import Utils from 'app/common/Utils';

describe('Data -> CourseTypes -> Reducer', () => {
  describe('courseTypesFetching', () => {
    it('should get default state when empty', () => {
      const state = false;

      const result = courseTypesFetching();

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = true;

      const result = courseTypesFetching(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual(true);
    });

    it('should get true when action is FETCH_COURSE_TYPES_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST};

      const result = courseTypesFetching(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual(false);
    });

    it('should get false when action is FETCH_COURSE_TYPES_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS};

      const result = courseTypesFetching(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual(true);
    });

    it('should get false when action is FETCH_COURSE_TYPES_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_COURSE_TYPES_ERROR};

      const result = courseTypesFetching(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual(true);
    });
  });

  describe('courseTypes', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when empty', () => {
      const state = null;

      const result = courseTypes();

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      };

      const result = courseTypes(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      });
    });

    it('should load CourseTypes when action is SET_COURSE_TYPES', () => {
      const state = {
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      };
      const action = {type: ACTION_TYPES.SET_COURSE_TYPES, payload: {courseTypes: {id: 5}}};

      const result = courseTypes(state, action);

      expect(result).toStrictEqual({id: 5});
      // don't mutate
      expect(state).toStrictEqual({
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      });
    });

    it('should load CourseTypes when action is FETCH_COURSE_TYPES_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      };
      const stateExpected = {
        'id-3': {id: 'id-3', name: 'abc'},
        'id-5': {id: 'id-5', name: 'abc2'},
      };
      const stateMocked = {
        'id-3': {id: 'id-3', name: 'abc'},
        'id-5': {id: 'id-5', name: 'abc2'},
      };
      const data = 'test';
      const action = {type: ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS, payload: {data: data}};
      arrayToObjectStub.withArgs(data).returns(stateMocked);

      const result = courseTypes(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, data);
      // don't mutate
      expect(state).toStrictEqual({
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      });
    });
  });
});