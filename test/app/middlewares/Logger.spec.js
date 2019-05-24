import {expect} from 'chai';
import sinon from 'sinon';
import logger from '../../../src/app/middlewares/Logger';

describe('Middlewares -> Logger', () => {
  const nextStub = sinon.stub();

  afterEach(() => {
    nextStub.reset();
  });

  it('should process action and store data in window', () => {
    const getState = () => ({id: 'state 1'});
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = logger(store)(nextStub)(action);

    expect(result).to.deep.equal(resultExpected);
    expect(window.store).to.deep.equal(store);
    expect(window.state).to.deep.equal({id: 'state 1'});
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).to.deep.equal({id: 'store 1', getState});
    expect(action).to.deep.equal({type: 'action1'});
  });
});