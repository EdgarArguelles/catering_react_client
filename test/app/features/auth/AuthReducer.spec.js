/* eslint-disable max-lines */
import sinon from 'sinon';
import Api, {ACTION_TYPES} from 'app/common/Api';
import AuthReducer, {connectSocket, logout, login, fetchPing} from 'app/features/auth/AuthReducer';

describe('Auth -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        socketConnected: false,
        loggedUser: null,
      };

      const result = AuthReducer(undefined, {});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };

      const result = AuthReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should change socketConnected value to true when action is connectSocket', () => {
      const state = {
        socketConnected: false,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const action = {type: connectSocket.type};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: false,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should change loggedUser value to null when action is SESSION_EXPIRED', () => {
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: ACTION_TYPES.SESSION_EXPIRED};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
    });

    it('should change loggedUser value to null when action is fetchPing.rejected', () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: fetchPing.rejected.type};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
      expect(window.sessionStorage.getItem('accessToken')).toBeNull();
      expect(window.sessionStorage.getItem('userImage')).toBeNull();
    });

    it('should change loggedUser value to null when action is logout', () => {
      window.sessionStorage.setItem('accessToken', 'access 1');
      window.sessionStorage.setItem('userImage', 'image 1');
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: null,
      };
      const action = {type: logout.type};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
      expect(window.sessionStorage.getItem('accessToken')).toBeNull();
      expect(window.sessionStorage.getItem('userImage')).toBeNull();
    });

    it('should assign loggedUser value when action is login', () => {
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {token: 'token 1', image: 'image 1'},
      };
      const action = {type: login.type, payload: {loggedUser: {token: 'token 1', image: 'image 1'}}};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
      expect(window.sessionStorage.getItem('accessToken')).toStrictEqual('token 1');
      expect(window.sessionStorage.getItem('userImage')).toStrictEqual('image 1');
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
    });

    it('should assign loggedUser value when action is fetchPing.fulfilled', () => {
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');
      const state = {
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      };
      const stateExpected = {
        socketConnected: true,
        loggedUser: {token: 'token 11'},
      };
      const action = {type: fetchPing.fulfilled.type, payload: {token: 'token 11'}};

      const result = AuthReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        socketConnected: true,
        loggedUser: {id: 'ID1'},
      });
      expect(window.sessionStorage.getItem('accessToken')).toStrictEqual('token 11');
      expect(window.sessionStorage.getItem('userImage')).toBeNull();
      window.sessionStorage.removeItem('accessToken');
    });
  });

  describe('Actions', () => {
    const dispatchStub = sinon.stub();
    const graphqlStub = sinon.stub(Api, 'graphql');

    afterEach(() => {
      dispatchStub.reset();
      graphqlStub.reset();
    });

    describe('fetchPing', () => {
      const body = {query: '{ping {id fullName image role token permissions}}'};
      const arg = undefined;
      const meta = {arg, requestId: sinon.match.string};
      const checkSinon = () => {
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchPing.pending.type,
          payload: undefined,
          meta,
        });
      };

      it('should dispatch fetchPing.fulfilled', async () => {
        const jsonExpected = {data: {ping: {id: 5, token: 'token 11', image: 'image 11'}}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await fetchPing(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(jsonExpected.data.ping);
        checkSinon();
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchPing.fulfilled.type,
          payload: jsonExpected.data.ping,
          meta,
        });
      });

      describe('fetchPing.rejected', () => {
        const checkErrorSinon = () => {
          sinon.assert.calledWithExactly(dispatchStub, {
            type: fetchPing.rejected.type,
            error: sinon.match.object,
            payload: undefined,
            meta: {arg, aborted: false, condition: false, requestId: sinon.match.string},
          });
        };

        it('should dispatch fetchPing.rejected when not json', async () => {
          const jsonExpected = null;
          graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

          const result = await fetchPing(arg)(dispatchStub);

          expect(result.error.message).toStrictEqual('loggedUser not present');
          checkSinon();
          checkErrorSinon();
        });

        it('should dispatch fetchPing.rejected when not data', async () => {
          const jsonExpected = {msg: 'OK'};
          graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

          const result = await fetchPing(arg)(dispatchStub);

          expect(result.error.message).toStrictEqual('loggedUser not present');
          checkSinon();
          checkErrorSinon();
        });

        it('should dispatch fetchPing.rejected when not ping', async () => {
          const jsonExpected = {data: {msg: 'OK'}};
          graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

          const result = await fetchPing(arg)(dispatchStub);

          expect(result.error.message).toStrictEqual('loggedUser not present');
          checkSinon();
          checkErrorSinon();
        });

        it('should dispatch fetchPing.rejected when not id', async () => {
          const jsonExpected = {data: {ping: {msg: 'OK'}}};
          graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

          const result = await fetchPing(arg)(dispatchStub);

          expect(result.error.message).toStrictEqual('loggedUser not present');
          checkSinon();
          checkErrorSinon();
        });

        it('should dispatch fetchPing.rejected when error', async () => {
          const errorExpected = new Error('error 1');
          graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

          const result = await fetchPing(arg)(dispatchStub);

          expect(result.error.message).toStrictEqual(errorExpected.message);
          checkSinon();
          checkErrorSinon();
        });
      });
    });
  });
});