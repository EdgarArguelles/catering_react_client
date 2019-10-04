import sinon from 'sinon';
import Api from 'app/common/Api';
import AppActions, {ACTION_TYPES} from 'app/AppActions';

describe('App -> Actions', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
  });

  describe('changeIsOnline', () => {
    it('should dispatch IS_APP_ONLINE', () => {
      const result = AppActions.changeIsOnline(true);

      expect(result).toStrictEqual({type: ACTION_TYPES.IS_APP_ONLINE, payload: {isOnline: true}});
    });
  });

  describe('changeTheme', () => {
    it('should dispatch CHANGE_APP_THEME', () => {
      const result = AppActions.changeTheme('dark');

      expect(result).toStrictEqual({type: ACTION_TYPES.CHANGE_APP_THEME, payload: {theme: 'dark'}});
    });
  });

  describe('getFacebookAccessCode', () => {
    const body = {query: '{getAccessCode(social: FACEBOOK)}'};

    it('should dispatch CHANGE_APP_FACEBOOK_ACCESS_CODE', async () => {
      const jsonExpected = {data: {getAccessCode: 'test token'}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await AppActions.getFacebookAccessCode()(dispatchStub);

      expect(result).toStrictEqual(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.CHANGE_APP_FACEBOOK_ACCESS_CODE,
        payload: {
          data: 'test token',
        },
      });
    });
  });
});