/* eslint-disable max-lines */
import Utils from 'app/common/Utils';

describe('Utils', () => {
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
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];
        const expected = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];

        const result = array.sort(Utils.getSortString());

        expect(result).toStrictEqual(expected);
      });

      it('should not sort the objects array when attribute is incorrect', () => {
        const array = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];
        const attribute = 'name2';
        const expected = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];

        const result = array.sort(Utils.getSortString(attribute));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array when attribute is incorrect and secondSort is present', () => {
        const array = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];
        const attribute = 'name2';
        const secondSort = (a, b) => a.extra - b.extra;
        const expected = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'Ab', extra: 1},
          {name: 'BB', extra: 45},
          {name: 'Ba', extra: 55},
        ];

        const result = array.sort(Utils.getSortString(attribute, secondSort));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array correctly when attribute is correct', () => {
        const array = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'BB', extra: 45},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
        ];
        const attribute = 'name';
        const expected = [
          {name: 'Aa', extra: 5},
          {name: 'Ab', extra: 1},
          {name: 'Ba', extra: 55},
          {name: 'BB', extra: 45},
          {name: 'C'},
        ];

        const result = array.sort(Utils.getSortString(attribute));

        expect(result).toStrictEqual(expected);
      });

      it('should sort the objects array correctly when attribute is correct and secondSort is present', () => {
        const array = [
          {name: 'Aa', extra: 5},
          {name: 'C'},
          {name: 'Aa', extra: 55},
          {name: 'Ab', extra: 1},
          {name: 'Aa', extra: 45},
        ];
        const attribute = 'name';
        const secondSort = (a, b) => a.extra - b.extra;
        const expected = [
          {name: 'Aa', extra: 5},
          {name: 'Aa', extra: 45},
          {name: 'Aa', extra: 55},
          {name: 'Ab', extra: 1},
          {name: 'C'},
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

  describe('arrayToObject', () => {
    it('should not mutate original array', () => {
      const array = [
        {id: 'id1', value: 'example', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'example2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id3', value: 'example3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ];
      const array2 = [
        {id: 'id1', value: 'example', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'example2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id3', value: 'example3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ];

      Utils.arrayToObject(array);

      // don't mutate
      expect(array).toStrictEqual(array2);
    });

    it('should transform a complex array to an object', () => {
      const array = [
        {id: 'id1', value: 'exam', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id3', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ];
      const expected = {
        id1: {id: 'id1', value: 'exam', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        id2: {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        id3: {id: 'id3', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      };

      const result = Utils.arrayToObject(array);

      expect(result).toStrictEqual(expected);
      // don't mutate
      expect(array).toStrictEqual([
        {id: 'id1', value: 'exam', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id3', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ]);
    });

    it('should overwrite a duplicate id', () => {
      const array = [
        {id: 'id1', value: 'exam', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id1', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ];
      const expected = {
        id1: {id: 'id1', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
        id2: {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
      };

      const result = Utils.arrayToObject(array);

      expect(result).toStrictEqual(expected);
      // don't mutate
      expect(array).toStrictEqual([
        {id: 'id1', value: 'exam', age: 5, inner: {val: 'a'}, list: [{inner: {val: 'aa'}, inner2: {val: 'a1'}}]},
        {id: 'id2', value: 'exam2', age: 6, inner: {val: 'b'}, list: [{inner: {val: 'bb'}, inner2: {val: 'b1'}}]},
        {id: 'id1', value: 'exam3', age: 7, inner: {val: 'c'}, list: [{inner: {val: 'cc'}, inner2: {val: 'c1'}}]},
      ]);
    });

    it('should throw an error when not parameter', () => {
      expect(() => Utils.arrayToObject()).toThrow('Cannot read property \'forEach\' of undefined');
    });

    it('should throw an error when null parameter', () => {
      expect(() => Utils.arrayToObject(null)).toThrow('Cannot read property \'forEach\' of null');
    });

    it('should throw an error when object parameter', () => {
      expect(() => Utils.arrayToObject({test: 'abc'})).toThrow('.forEach is not a function');
    });

    it('should throw an error when numeric parameter', () => {
      expect(() => Utils.arrayToObject(5)).toThrow('.forEach is not a function');
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
        friends: [{id: 1, name: 'F1'}, {id: 2, name: 'F2'}, {id: 3, name: 'F3'}],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{id: 1, value: '123'}, {id: 2, value: '456', extra: 45.8}],
          value6: {a: 1, b: 2},
        },
      };
      const json2 = {
        id: 1,
        name: 'test',
        gender: undefined,
        age: null,
        scores: [1, 2, 3, 4],
        friends: [{id: 1, name: 'F1'}, {id: 2, name: 'F2'}, {id: 3, name: 'F3'}],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{id: 1, value: '123'}, {id: 2, value: '456', extra: 45.8}],
          value6: {a: 1, b: 2},
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
        friends: [{id: 1, name: 'F1'}, {id: 2, name: 'F2'}, {id: 3, name: 'F3'}],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{id: 1, value: '123'}, {id: 2, value: '456', extra: 45.8}],
          value6: {a: 1, b: 2},
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
        friends: [{id: 1, name: 'F1'}, {id: 2, name: 'F2'}, {id: 3, name: 'F3'}],
        status: {
          value1: 1,
          value2: 'a',
          value3: undefined,
          value4: null,
          value5: [{id: 1, value: '123'}, {id: 2, value: '456', extra: 45.8}],
          value6: {a: 1, b: 2},
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
});