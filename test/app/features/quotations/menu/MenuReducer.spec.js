/* eslint-disable max-lines */
import MenuReducer, {
  cleanData, changeName, changeQuantity, addCourse, removeCourse, increasePrice, decreasePrice, changeCoursesPosition,
} from 'app/features/quotations/menu/MenuReducer';

describe('Quotations -> Menu -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        name: '',
        quantity: 1,
        price: 0,
        courses: [],
      };

      const result = MenuReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'a15', extra: '11'}, {id: 'a16'}]},
          {position: 2, type: {id: 'a4'}, dishes: [{id: 'a17'}]},
        ],
      };

      const result = MenuReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'a15', extra: '11'}, {id: 'a16'}]},
          {position: 2, type: {id: 'a4'}, dishes: [{id: 'a17'}]},
        ],
      });
    });

    it('should clean all data when action is cleanData', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: '',
        quantity: 1,
        price: 0,
        courses: [],
      };
      const action = {type: cleanData.type};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should change name when action is changeName', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: 'name 2',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const action = {type: changeName.type, payload: 'name 2'};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should change quantity when action is changeQuantity', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 5,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const action = {type: changeQuantity.type, payload: 5};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should increase price when action is increasePrice', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 95.5,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const action = {type: increasePrice.type, payload: 15.5};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should decrease price when action is decreasePrice', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 64.5,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const action = {type: decreasePrice.type, payload: 15.5};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should add a course when action is addCourse and empty dishes', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
          {position: 3, type: {id: 5}, dishes: []},
        ],
      };
      const action = {type: addCourse.type, payload: {position: 3, courseTypeId: 5, dishesIds: []}};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 3}, dishes: [{id: 15, extra: '11'}, {id: 16}]},
          {position: 2, type: {id: 4}, dishes: [{id: 17}]},
        ],
      });
    });

    it('should add a course when action is addCourse and full dishes', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'a15', extra: '11'}, {id: 'a16'}]},
          {position: 2, type: {id: 'a4'}, dishes: [{id: 'a17'}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'a15', extra: '11'}, {id: 'a16'}]},
          {position: 2, type: {id: 'a4'}, dishes: [{id: 'a17'}]},
          {position: 3, type: {id: 'a5'}, dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}]},
        ],
      };
      const action = {
        type: addCourse.type,
        payload: {position: 3, courseTypeId: 'a5', dishesIds: ['d1', 'd2', 'd3']},
      };

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'a15', extra: '11'}, {id: 'a16'}]},
          {position: 2, type: {id: 'a4'}, dishes: [{id: 'a17'}]},
        ],
      });
    });

    it('should get the same original status when action is removeCourse and ' +
      'position and courseTypeId invalid', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const action = {type: removeCourse.type, payload: {position: 4, courseTypeId: 'a22'}};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });

    it('should get the same original status when action is removeCourse ' +
      'and position valid and courseTypeId invalid', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const action = {type: removeCourse.type, payload: {position: 2, courseTypeId: 'a22'}};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });

    it('should not remove a course when action is removeCourse and position ' +
      'invalid and courseTypeId valid', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
        ],
      };
      const action = {type: removeCourse.type, payload: {position: 4, courseTypeId: 'a2'}};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });

    it('should remove a course when action is removeCourse and position and courseTypeId valid', () => {
      const state = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
        ],
      };
      const action = {type: removeCourse.type, payload: {position: 2, courseTypeId: 'a2'}};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });

    it('should get the same original status when action is changeCoursesPosition' +
      ' and newCourses is empty', () => {
      const state = {
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const action = {type: changeCoursesPosition.type, payload: []};

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });

    it('should reorder when action is changeCoursesPosition', () => {
      const state = {
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      };
      const stateExpected = {
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
        ],
      };
      const action = {
        type: changeCoursesPosition.type,
        payload: [
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
        ],
      };

      const result = MenuReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        tab: 5,
        name: 'name 1',
        quantity: 10,
        price: 80,
        courses: [
          {position: 2, type: {id: 'a1'}, dishes: [{id: 'a115', extra: '11'}, {id: 'a116'}]},
          {position: 1, type: {id: 'a1'}, dishes: [{id: 'a117'}]},
          {position: 3, type: {id: 'a1'}, dishes: [{id: 'd11'}, {id: 'd12'}, {id: 'd13'}]},
          {position: 2, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
          {position: 1, type: {id: 'a2'}, dishes: [{id: 'a217'}]},
          {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          {position: 2, type: {id: 'a3'}, dishes: [{id: 'd31'}, {id: 'd32'}, {id: 'd33'}]},
          {position: 1, type: {id: 'a3'}, dishes: [{id: 'd32'}]},
          {position: 3, type: {id: 'a3'}, dishes: [{id: 'd33'}]},
        ],
      });
    });
  });
});