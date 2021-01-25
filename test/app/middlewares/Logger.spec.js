import sinon from 'sinon';
import logger from 'app/middlewares/Logger';

describe('Middlewares -> Logger', () => {
  const nextStub = sinon.stub();

  afterEach(() => nextStub.reset());

  it('should process action and store data in window', () => {
    const getState = () => ({id: 'state 1'});
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = logger(store)(nextStub)(action);

    expect(result).toStrictEqual(resultExpected);
    expect(window.store).toStrictEqual(store);
    expect(window.state).toStrictEqual({id: 'state 1'});
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).toStrictEqual({id: 'store 1', getState});
    expect(action).toStrictEqual({type: 'action1'});
  });
});