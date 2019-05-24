/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import Api from '../../../../src/app/common/Api';
import AuthActions, {ACTION_TYPES} from '../../../../src/app/features/auth/AuthActions';

describe('Auth -> Actions', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
  });

  describe('connectSocket', () => {
    it('should dispatch SOCKET_CONNECTED', () => {
      const result = AuthActions.connectSocket();

      expect(result).to.deep.equal({type: ACTION_TYPES.SOCKET_CONNECTED});
    });
  });

  describe('logout', () => {
    it('should dispatch LOGOUT', () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const result = AuthActions.logout();

      expect(result).to.deep.equal({type: ACTION_TYPES.LOGOUT});
      expect(window.sessionStorage.getItem('accessToken')).to.be.null;
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
    });
  });

  describe('login', () => {
    it('should dispatch LOGIN_SUCCESS with image', () => {
      const body = {id: 'ID 1', loggedUser: {token: 'token 1', image: 'image 1'}};
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');

      const result = AuthActions.login(body);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: {
          loggedUser: {token: 'token 1', image: 'image 1'},
        },
      });
      expect(window.sessionStorage.getItem('accessToken')).to.deep.equal('token 1');
      expect(window.sessionStorage.getItem('userImage')).to.deep.equal('image 1');
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
      // don't mutate
      expect(body).to.deep.equal({id: 'ID 1', loggedUser: {token: 'token 1', image: 'image 1'}});
    });

    it('should dispatch LOGIN_SUCCESS without image', () => {
      const body = {id: 'ID 1', loggedUser: {token: 'token 1'}};
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');

      const result = AuthActions.login(body);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: {
          loggedUser: {token: 'token 1'},
        },
      });
      expect(window.sessionStorage.getItem('accessToken')).to.deep.equal('token 1');
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
      // don't mutate
      expect(body).to.deep.equal({id: 'ID 1', loggedUser: {token: 'token 1'}});
    });
  });

  describe('fetchPing', () => {
    const body = {query: '{ping {id fullName image role token permissions}}'};

    it('should dispatch PING_USER_ERROR when not json', async () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const jsonExpected = null;
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await AuthActions.fetchPing()(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.PING_USER_ERROR});
      expect(window.sessionStorage.getItem('accessToken')).to.be.null;
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
    });

    it('should dispatch PING_USER_ERROR when not data', async () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const jsonExpected = {msg: 'OK'};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await AuthActions.fetchPing()(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.PING_USER_ERROR});
      expect(window.sessionStorage.getItem('accessToken')).to.be.null;
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
    });

    it('should dispatch PING_USER_ERROR when not ping', async () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const jsonExpected = {data: {msg: 'OK'}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await AuthActions.fetchPing()(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.PING_USER_ERROR});
      expect(window.sessionStorage.getItem('accessToken')).to.be.null;
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
    });

    it('should dispatch PING_USER_ERROR when not id', async () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const jsonExpected = {data: {ping: {msg: 'OK'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await AuthActions.fetchPing()(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.PING_USER_ERROR});
      expect(window.sessionStorage.getItem('accessToken')).to.be.null;
      expect(window.sessionStorage.getItem('userImage')).to.be.null;
    });

    it('should dispatch PING_USER_SUCCESS', async () => {
      const jsonExpected = {data: {ping: {id: 5, token: 'token 11', image: 'image 11'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');

      const result = await AuthActions.fetchPing()(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.PING_USER_SUCCESS,
        payload: {
          loggedUser: {id: 5, token: 'token 11', image: 'image 11'},
        },
      });
      expect(window.sessionStorage.getItem('accessToken')).to.deep.equal('token 11');
      expect(window.sessionStorage.getItem('userImage')).to.deep.equal('image 11');
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
    });

    it('should dispatch PING_USER_ERROR', async () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');

      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await AuthActions.fetchPing()(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 1);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.PING_USER_ERROR});
        expect(window.sessionStorage.getItem('accessToken')).to.be.null;
        expect(window.sessionStorage.getItem('userImage')).to.be.null;
      }
    });
  });
});