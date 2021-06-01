/* eslint-disable max-lines */
import sinon from 'sinon';
import Utils from 'app/common/Utils';

describe('Utils', () => {
  describe('anyMatcher', () => {
    it('should get false if type is not present in list', () => {
      const result = Utils.anyMatcher('A', 'B', 'C')({ type: 'a' });

      expect(result).toBeFalsy();
    });

    it('should get true if type is present in list', () => {
      const result = Utils.anyMatcher('A', 'B', 'C')({ type: 'A' });

      expect(result).toBeTruthy();
    });
  });

  describe('getSortString', () => {
    describe('string', () => {
      it('should sort the strings array correctly when attribute is undefined', () => {
        const array = ['Aa', 'C', 'BB', 'Ab', 'Ba'];
        const expected = ['Aa', 'Ab', 'Ba', 'BB', 'C'];

        const result = array.sort(Utils.getSortString());

        expect(result).toStrictEqual(expected);
      });

      it('should sort the strings array correctly when attribute is present', () => {
        const array = ['Aa', 'C', 'BB', 'Ab', 'Ba'];
        const attribute = 'name';
        const expected = ['Aa', 'Ab', 'Ba', 'BB', 'C'];

        const result = array.sort(Utils.getSortString(attribute));

        expect(result).toStrictEqual(expected);
      });
    });

    describe('objects', () => {
      it('should not sort the objects array when attribute is undefined', () => {
        const array = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];
        const expected = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];

        const result = array.sort(Utils.getSortString());

        expect(result).toStrictEqual(expected);
      });

      it('should not sort the objects array when attribute is incorrect', () => {
        const array = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];
        const attribute = 'name2';
        const expected = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];

        const result = array.sort(Utils.getSortString(attribute));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array when attribute is incorrect and secondSort is present', () => {
        const array = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];
        const attribute = 'name2';
        const secondSort = (a, b) => a.extra - b.extra;
        const expected = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'Ab', extra: 1 },
          { name: 'BB', extra: 45 },
          { name: 'Ba', extra: 55 },
        ];

        const result = array.sort(Utils.getSortString(attribute, secondSort));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array correctly when attribute is correct', () => {
        const array = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'BB', extra: 45 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
        ];
        const attribute = 'name';
        const expected = [
          { name: 'Aa', extra: 5 },
          { name: 'Ab', extra: 1 },
          { name: 'Ba', extra: 55 },
          { name: 'BB', extra: 45 },
          { name: 'C' },
        ];

        const result = array.sort(Utils.getSortString(attribute));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array correctly when attribute is correct and secondSort is present', () => {
        const array = [
          { name: 'Aa', extra: 5 },
          { name: 'C' },
          { name: 'Aa', extra: 55 },
          { name: 'Ab', extra: 1 },
          { name: 'Aa', extra: 45 },
        ];
        const attribute = 'name';
        const secondSort = (a, b) => a.extra - b.extra;
        const expected = [
          { name: 'Aa', extra: 5 },
          { name: 'Aa', extra: 45 },
          { name: 'Aa', extra: 55 },
          { name: 'Ab', extra: 1 },
          { name: 'C' },
        ];

        const result = array.sort(Utils.getSortString(attribute, secondSort));

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('getDriveImage', () => {
    it('should get drive path', () => {
      const id = 'test';
      const expected = 'https://drive.google.com/uc?export=view&id=test';

      const result = Utils.getDriveImage(id);

      expect(result).toStrictEqual(expected);
    });
  });

  describe('stringifyObjectWithNoQuotesOnKeys', () => {
    it('should not mutate original json', () => {
      const json = {
        id: 1,
        name: 'test',
        gender: undefined,
        age: null,
        scores: [1, 2, 3, 4],
        friends: [{ id: 1, name: 'F1' }, { id: 2, name: 'F2' }, { id: 3, name: 'F3' }],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{ id: 1, value: '123' }, { id: 2, value: '456', extra: 45.8 }],
          value6: { a: 1, b: 2 },
        },
      };
      const json2 = {
        id: 1,
        name: 'test',
        gender: undefined,
        age: null,
        scores: [1, 2, 3, 4],
        friends: [{ id: 1, name: 'F1' }, { id: 2, name: 'F2' }, { id: 3, name: 'F3' }],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{ id: 1, value: '123' }, { id: 2, value: '456', extra: 45.8 }],
          value6: { a: 1, b: 2 },
        },
      };

      Utils.stringifyObjectWithNoQuotesOnKeys(json);

      // don't mutate
      expect(json).toStrictEqual(json2);
    });

    it('should transform a complex object', () => {
      const json = {
        id: 1,
        name: 'test',
        gender: undefined,
        age: null,
        scores: [1, 2, 3, 4],
        friends: [{ id: 1, name: 'F1' }, { id: 2, name: 'F2' }, { id: 3, name: 'F3' }],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{ id: 1, value: '123' }, { id: 2, value: '456', extra: 45.8 }],
          value6: { a: 1, b: 2 },
        },
      };
      const expected = '{id:1,name:"test",gender:undefined,age:null,scores:[1,2,3,4],' +
        'friends:[{id:1,name:"F1"},{id:2,name:"F2"},{id:3,name:"F3"}],' +
        'status:{value1:1,value2:"a",value3:undefined,value4:null,' +
        'value5:[{id:1,value:"123"},{id:2,value:"456",extra:45.8}],' +
        'value6:{a:1,b:2}}}';

      const result = Utils.stringifyObjectWithNoQuotesOnKeys(json);

      expect(result).toStrictEqual(expected);
      // don't mutate
      expect(json).toStrictEqual({
        id: 1,
        name: 'test',
        gender: undefined,
        age: null,
        scores: [1, 2, 3, 4],
        friends: [{ id: 1, name: 'F1' }, { id: 2, name: 'F2' }, { id: 3, name: 'F3' }],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{ id: 1, value: '123' }, { id: 2, value: '456', extra: 45.8 }],
          value6: { a: 1, b: 2 },
        },
      });
    });

    it('should transform when not parameter', () => {
      const expected = undefined;

      const result = Utils.stringifyObjectWithNoQuotesOnKeys();

      expect(result).toStrictEqual(expected);
    });

    it('should transform when null parameter', () => {
      const expected = null;

      const result = Utils.stringifyObjectWithNoQuotesOnKeys(null);

      expect(result).toStrictEqual(expected);
    });
  });

  describe('stringifyPageDataRequest', () => {
    it('should not mutate original json', () => {
      const json = {
        id: 1,
        name: 'test',
        value1: 'ASC',
        value2: 'DESC',
      };
      const json2 = {
        id: 1,
        name: 'test',
        value1: 'ASC',
        value2: 'DESC',
      };

      Utils.stringifyPageDataRequest(json);

      // don't mutate
      expect(json).toStrictEqual(json2);
    });

    it('should transform a complex object', () => {
      const json = {
        id: 1,
        name: 'test',
        value1: 'ASC',
        value2: 'DESC',
      };
      const expected = '{id:1,name:"test",value1:ASC,value2:DESC}';

      const result = Utils.stringifyPageDataRequest(json);

      expect(result).toStrictEqual(expected);
      // don't mutate
      expect(json).toStrictEqual({
        id: 1,
        name: 'test',
        value1: 'ASC',
        value2: 'DESC',
      });
    });

    it('should throw an error when not parameter', () => {
      expect(() => Utils.stringifyPageDataRequest()).toThrow('Cannot read property \'replace\' of undefined');
    });

    it('should throw an error when null parameter', () => {
      expect(() => Utils.stringifyPageDataRequest(null)).toThrow('Cannot read property \'replace\' of null');
    });
  });

  describe('resetInfiniteQuery', () => {
    it('should call setQueryData and invalidateQueries once', () => {
      const queryKey = 'testKey';
      const newPageParams = { sort: ['newField'] };
      const setQueryDataStub = sinon.stub();
      const invalidateQueriesStub = sinon.stub();
      const queryClient = { setQueryData: setQueryDataStub, invalidateQueries: invalidateQueriesStub };

      Utils.resetInfiniteQuery(queryClient, queryKey, newPageParams);

      sinon.assert.callCount(setQueryDataStub, 1);
      sinon.assert.calledWithExactly(setQueryDataStub, queryKey, sinon.match.func);
      sinon.assert.callCount(invalidateQueriesStub, 1);
      sinon.assert.calledWithExactly(invalidateQueriesStub, queryKey);
    });
  });

  describe('completeLoading', () => {
    it('should change display values', () => {
      const loadingElement = { style: { display: 'old' } };
      const contentElement = { style: { display: 'old' } };
      const getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs('loading').returns(loadingElement);
      getElementByIdStub.withArgs('content').returns(contentElement);

      Utils.completeLoading();

      expect(loadingElement.style.display).toStrictEqual('none');
      expect(contentElement.style.display).toStrictEqual('block');
      sinon.assert.callCount(getElementByIdStub, 2);
      sinon.assert.calledWithExactly(getElementByIdStub, 'loading');
      sinon.assert.calledWithExactly(getElementByIdStub, 'content');
      getElementByIdStub.restore();
    });
  });

  describe('animateIcon', () => {
    const id = '5';
    const querySelectorAllStub = sinon.stub();
    const setAttributeStub = sinon.stub();
    let getElementByIdStub;

    beforeEach(() => {
      querySelectorAllStub.withArgs('path').returns([
        { setAttribute: setAttributeStub }, { setAttribute: setAttributeStub }]);
      getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs(id).returns({ querySelectorAll: querySelectorAllStub });
    });

    afterEach(() => {
      querySelectorAllStub.reset();
      setAttributeStub.reset();
      getElementByIdStub.restore();
    });

    it('should use strokeWidth default value', () => {
      Utils.animateIcon(id);

      sinon.assert.callCount(getElementByIdStub, 1);
      sinon.assert.calledWithExactly(getElementByIdStub, id);
      sinon.assert.callCount(setAttributeStub, 6);
      sinon.assert.calledWithExactly(setAttributeStub, 'fill', 'transparent');
      sinon.assert.calledWithExactly(setAttributeStub, 'stroke', 'currentColor');
      sinon.assert.calledWithExactly(setAttributeStub, 'stroke-width', 40);
    });

    it('should not use strokeWidth default value', () => {
      Utils.animateIcon(id, { strokeWidth: 60 });

      sinon.assert.callCount(getElementByIdStub, 1);
      sinon.assert.calledWithExactly(getElementByIdStub, id);
      sinon.assert.callCount(setAttributeStub, 6);
      sinon.assert.calledWithExactly(setAttributeStub, 'fill', 'transparent');
      sinon.assert.calledWithExactly(setAttributeStub, 'stroke', 'currentColor');
      sinon.assert.calledWithExactly(setAttributeStub, 'stroke-width', 60);
    });
  });
});