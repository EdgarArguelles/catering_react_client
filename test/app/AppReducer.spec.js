/* eslint-disable max-lines */
import sinon from 'sinon';
import Api from 'app/common/Api';
import appReducer, {changeIsLandscape, changeIsOnline, changeTheme, getFacebookAccessCode} from 'app/AppReducer';

describe('App -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        isOnline: true,
        isLandscape: false,
        theme: 'light',
        facebookAccessCode: '',
      };

      const result = appReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        isOnline: false,
        isLandscape: true,
        theme: 'test',
        facebookAccessCode: '123',
      };

      const result = appReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        isLandscape: true,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });

    it('should change isOnline value to true when action is changeIsOnline', () => {
      const state = {
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: true,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const action = {type: changeIsOnline.type, payload: true};

      const result = appReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });

    it('should change isLandscape value to true when action is changeIsLandscape', () => {
      const state = {
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: false,
        isLandscape: true,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const action = {type: changeIsLandscape.type, payload: true};

      const result = appReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });

    it('should change theme value to "dark" when action is changeTheme', () => {
      const state = {
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: false,
        isLandscape: false,
        theme: 'dark',
        facebookAccessCode: '123',
      };
      const action = {type: changeTheme.type, payload: 'dark'};

      const result = appReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });

    it('should change facebookAccessCode value to "456" when action is getFacebookAccessCode.fulfilled', () => {
      const state = {
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '456',
      };
      const action = {type: getFacebookAccessCode.fulfilled.type, payload: {data: {getAccessCode: '456'}}};

      const result = appReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        isLandscape: false,
        theme: 'test',
        facebookAccessCode: '123',
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

    describe('getFacebookAccessCode', () => {
      const arg = null;
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: '{getAccessCode(social: FACEBOOK)}'};

      it('should dispatch getFacebookAccessCode.fulfilled', async () => {
        const jsonExpected = {data: {getAccessCode: 'test token'}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await getFacebookAccessCode(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(jsonExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {
          type: getFacebookAccessCode.pending.type,
          payload: undefined,
          meta,
        });
        sinon.assert.calledWithExactly(dispatchStub, {
          type: getFacebookAccessCode.fulfilled.type,
          payload: jsonExpected,
          meta,
        });
        // don't mutate
        expect(arg).toStrictEqual(null);
      });

      it('should dispatch getFacebookAccessCode.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await getFacebookAccessCode(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {
          type: getFacebookAccessCode.pending.type,
          payload: undefined,
          meta,
        });
        sinon.assert.calledWithExactly(dispatchStub, {
          type: getFacebookAccessCode.rejected.type,
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
        expect(arg).toStrictEqual(null);
      });
    });
  });
});