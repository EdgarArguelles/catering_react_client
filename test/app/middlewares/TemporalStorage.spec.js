import {expect} from 'chai';
import sinon from 'sinon';
import temporalStorage from '../../../src/app/middlewares/TemporalStorage';

describe('Middlewares -> TemporalStorage', () => {
  const nextStub = sinon.stub();

  afterEach(() => {
    nextStub.reset();
  });

  it('should process action and store data in sessionStorage and localStorage when courseTypes is present', () => {
    const getState = () => ({
      id: 'state 1',
      quotations: {id: 'Q1', extra: 'abc', isRemoteProcessing: true},
      data: {id: 'D1', version: 'V1', courseTypes: {id: 'CT1'}, dishes: [{id: 'd1'}, {id: 'd2'}]},
    });
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = temporalStorage(store)(nextStub)(action);

    expect(result).to.deep.equal(resultExpected);
    expect(window.sessionStorage.getItem('quotationsState')).to.deep.equal(JSON.stringify({
      id: 'Q1',
      extra: 'abc',
      isRemoteProcessing: false,
    }));
    expect(window.localStorage.getItem('dataState')).to.deep.equal(JSON.stringify({
      version: 'V1',
      dishes: [{id: 'd1'}, {id: 'd2'}],
    }));
    expect(window.localStorage.getItem('courseTypesCached')).to.deep.equal(JSON.stringify({id: 'CT1'}));
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).to.deep.equal({id: 'store 1', getState});
    expect(action).to.deep.equal({type: 'action1'});
    window.sessionStorage.removeItem('quotationsState');
    window.localStorage.removeItem('dataState');
    window.localStorage.removeItem('courseTypesCached');
  });

  it('should process action and store data in sessionStorage and localStorage when courseTypes is not present', () => {
    const getState = () => ({
      id: 'state 1',
      quotations: {id: 'Q1', extra: 'abc', isRemoteProcessing: true},
      data: {id: 'D1', dishes: [{id: 'd1'}, {id: 'd2'}]},
    });
    window.localStorage.setItem('courseTypesCached', 'OLD Value');
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = temporalStorage(store)(nextStub)(action);

    expect(result).to.deep.equal(resultExpected);
    expect(window.sessionStorage.getItem('quotationsState')).to.deep.equal(JSON.stringify({
      id: 'Q1',
      extra: 'abc',
      isRemoteProcessing: false,
    }));
    expect(window.localStorage.getItem('dataState')).to.deep.equal(JSON.stringify({
      version: undefined,
      dishes: [{id: 'd1'}, {id: 'd2'}],
    }));
    expect(window.localStorage.getItem('courseTypesCached')).to.equal('OLD Value');
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).to.deep.equal({id: 'store 1', getState});
    expect(action).to.deep.equal({type: 'action1'});
    window.sessionStorage.removeItem('quotationsState');
    window.localStorage.removeItem('dataState');
    window.localStorage.removeItem('courseTypesCached');
  });
});