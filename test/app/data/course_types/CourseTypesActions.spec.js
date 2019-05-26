/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import Api from 'app/common/Api';
import CourseTypesActions, {ACTION_TYPES} from 'app/data/course_types/CourseTypesActions';

describe('Data -> CourseTypes -> Actions', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
  });

  describe('setCourseTypes', () => {
    it('should dispatch SET_COURSE_TYPES', () => {
      const courseTypes = {id: 5};

      const result = CourseTypesActions.setCourseTypes(courseTypes);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.SET_COURSE_TYPES,
        payload: {
          courseTypes,
        },
      });
      // don't mutate
      expect(courseTypes).to.deep.equal({id: 5});
    });
  });

  describe('fetchCourseTypes', () => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const versionBody = {query: '{version {version}}'};

    it('should dispatch FETCH_COURSE_TYPES_REQUEST and FETCH_COURSE_TYPES_SUCCESS', async () => {
      const jsonExpected = {data: {activeCourseTypes: {value: 'test'}}};
      const versionJsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      graphqlStub.withArgs(dispatchStub, versionBody).returns(versionJsonExpected);

      const result = await CourseTypesActions.fetchCourseTypes()(dispatchStub);

      expect(result).to.deep.equal({data: {activeCourseTypes: {value: 'test'}}, metaData: {version: 'version1'}});
      sinon.assert.callCount(graphqlStub, 2);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
    });

    it('should dispatch FETCH_COURSE_TYPES_REQUEST and FETCH_COURSE_TYPES_ERROR when version fails', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, versionBody).throws(errorExpected);

      try {
        await CourseTypesActions.fetchCourseTypes()(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_COURSE_TYPES_ERROR,
          error: true,
          payload: errorExpected,
        });
      }
    });

    it('should dispatch FETCH_COURSE_TYPES_REQUEST and FETCH_COURSE_TYPES_ERROR when' +
      ' activeCourseTypes fails', async () => {
      const errorExpected = new Error('error 1');
      const versionJsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      graphqlStub.withArgs(dispatchStub, versionBody).returns(versionJsonExpected);

      try {
        await CourseTypesActions.fetchCourseTypes()(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 2);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, versionBody);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_COURSE_TYPES_ERROR,
          error: true,
          payload: errorExpected,
        });
      }
    });
  });
});