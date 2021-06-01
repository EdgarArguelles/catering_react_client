import sinon from 'sinon';
import temporalStorage from 'app/middlewares/TemporalStorage';

describe('Middlewares -> TemporalStorage', () => {
  const nextStub = sinon.stub();

  afterEach(() => {
    nextStub.reset();
    window.localStorage.removeItem('appTheme');
    window.sessionStorage.removeItem('quotationsState');
  });

  it('should process action and store data in sessionStorage and localStorage', () => {
    const getState = () => ({
      id: 'state 1',
      app: { theme: 'dark' },
      quotations: { id: 'Q1', extra: 'abc' },
    });
    const store = { id: 'store 1', getState };
    const action = { type: 'action1' };
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = temporalStorage(store)(nextStub)(action);

    expect(result).toStrictEqual(resultExpected);
    expect(window.localStorage.getItem('appTheme')).toStrictEqual('dark');
    expect(window.sessionStorage.getItem('quotationsState')).toStrictEqual(JSON.stringify({ id: 'Q1', extra: 'abc' }));
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).toStrictEqual({ id: 'store 1', getState });
    expect(action).toStrictEqual({ type: 'action1' });
  });
});