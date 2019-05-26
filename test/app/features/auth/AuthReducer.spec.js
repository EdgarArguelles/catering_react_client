/* eslint-disable max-lines */
import {expect} from 'chai';
import {ACTION_TYPES as API_ACTION_TYPES} from 'app/common/Api';
import {ACTION_TYPES} from 'app/features/auth/AuthActions';
import AuthReducer from 'app/features/auth/AuthReducer';

describe('Auth -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      socketConnected: false,
      loggedUser: null,
    };

    const result = AuthReducer();

    expect(result).to.deep.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      socketConnected: true,
      loggedUser: {id: 'ID1'},
    };

    const result = AuthReducer(state, {type: 'invalid'});

    expect(result).to.deep.equal(state);
    // don't mutate
    expect(state).to.deep.equal({
      socketConnected: true,
      loggedUser: {id: 'ID1'},
    });
  });

  describe('socketConnected', () => {
    it('should change socketConnected value to true when action is SOCKET_CONNECTED', () => {
      const state = {
        socketConnected: false,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const action = {type: ACTION_TYPES.SOCKET_CONNECTED};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: false,
        loggedUser: {id: 'ID1'},
      });
    });
  });

  describe('loggedUser', () => {
    it('should change loggedUser value to null when action is SESSION_EXPIRED', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: API_ACTION_TYPES.SESSION_EXPIRED};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should change loggedUser value to null when action is PING_USER_ERROR', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: ACTION_TYPES.PING_USER_ERROR};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should change loggedUser value to null when action is LOGOUT', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: ACTION_TYPES.LOGOUT};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should assign loggedUser value when action is LOGIN_SUCCESS', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {id: 'ID2'},
      };
      const action = {type: ACTION_TYPES.LOGIN_SUCCESS, payload: {loggedUser: {id: 'ID2'}}};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should assign loggedUser value when action is PING_USER_SUCCESS', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {id: 'ID2'},
      };
      const action = {type: ACTION_TYPES.PING_USER_SUCCESS, payload: {loggedUser: {id: 'ID2'}}};

      const result = AuthReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });
  });
});