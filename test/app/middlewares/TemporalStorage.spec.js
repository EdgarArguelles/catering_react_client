import sinon from 'sinon';
import temporalStorage from 'app/middlewares/TemporalStorage';

describe('Middlewares -> TemporalStorage', () => {
  const nextStub = sinon.stub();

  afterEach(() => {
    nextStub.reset();
  });

  it('should process action and store data in sessionStorage and localStorage when courseTypes is present', () => {
    const getState = () => ({
      id: 'state 1',
      app: {theme: 'dark'},
      quotations: {id: 'Q1', extra: 'abc', isRemoteProcessing: true},
      data: {id: 'D1', version: 'V1', courseTypes: {data: {id: 'CT1'}}, dishes: {data: [{id: 'd1'}, {id: 'd2'}]}},
    });
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = temporalStorage(store)(nextStub)(action);

    expect(result).toStrictEqual(resultExpected);
    expect(window.localStorage.getItem('appTheme')).toStrictEqual('dark');
    expect(window.sessionStorage.getItem('quotationsState')).toStrictEqual(JSON.stringify({
      id: 'Q1',
      extra: 'abc',
      isRemoteProcessing: false,
    }));
    expect(window.localStorage.getItem('dataState')).toStrictEqual(JSON.stringify({
      version: 'V1',
      dishes: {data: [{id: 'd1'}, {id: 'd2'}]},
    }));
    expect(window.localStorage.getItem('courseTypesCached')).toStrictEqual(JSON.stringify({data: {id: 'CT1'}}));
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).toStrictEqual({id: 'store 1', getState});
    expect(action).toStrictEqual({type: 'action1'});
    window.localStorage.removeItem('appTheme');
    window.sessionStorage.removeItem('quotationsState');
    window.localStorage.removeItem('dataState');
    window.localStorage.removeItem('courseTypesCached');
  });

  it('should process action and store data in sessionStorage and localStorage when courseTypes is not present', () => {
    const getState = () => ({
      id: 'state 1',
      app: {theme: 'extra'},
      quotations: {id: 'Q1', extra: 'abc', isRemoteProcessing: true},
      data: {id: 'D1', dishes: {data: [{id: 'd1'}, {id: 'd2'}]}},
    });
    window.localStorage.setItem('courseTypesCached', 'OLD Value');
    const store = {id: 'store 1', getState};
    const action = {type: 'action1'};
    const resultExpected = 'test';
    nextStub.withArgs(action).returns(resultExpected);

    const result = temporalStorage(store)(nextStub)(action);

    expect(result).toStrictEqual(resultExpected);
    expect(window.localStorage.getItem('appTheme')).toStrictEqual('extra');
    expect(window.sessionStorage.getItem('quotationsState')).toStrictEqual(JSON.stringify({
      id: 'Q1',
      extra: 'abc',
      isRemoteProcessing: false,
    }));
    expect(window.localStorage.getItem('dataState')).toStrictEqual(JSON.stringify({
      version: undefined,
      dishes: {data: [{id: 'd1'}, {id: 'd2'}]},
    }));
    expect(window.localStorage.getItem('courseTypesCached')).toStrictEqual('OLD Value');
    sinon.assert.callCount(nextStub, 1);
    sinon.assert.calledWithExactly(nextStub, action);
    // don't mutate
    expect(store).toStrictEqual({id: 'store 1', getState});
    expect(action).toStrictEqual({type: 'action1'});
    window.localStorage.removeItem('appTheme');
    window.sessionStorage.removeItem('quotationsState');
    window.localStorage.removeItem('dataState');
    window.localStorage.removeItem('courseTypesCached');
  });
});