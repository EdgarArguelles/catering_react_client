/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/features/quotations/menu/MenuActions';
import MenuReducer from 'app/features/quotations/menu/MenuReducer';

describe('Quotations -> Menu -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      name: '',
      quantity: 1,
      price: 0,
      courses: [],
    };

    const result = MenuReducer();

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

  describe('name', () => {
    it('should change name when action is MENU_CHANGE_NAME', () => {
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
      const action = {type: ACTION_TYPES.MENU_CHANGE_NAME, payload: {name: 'name 2'}};

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
  });

  describe('quantity', () => {
    it('should change quantity when action is MENU_CHANGE_QUANTITY', () => {
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
      const action = {type: ACTION_TYPES.MENU_CHANGE_QUANTITY, payload: {quantity: 5}};

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
  });

  describe('price', () => {
    it('should increase price when action is MENU_INCREASE_PRICE', () => {
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
      const action = {type: ACTION_TYPES.MENU_INCREASE_PRICE, payload: {amount: 15.5}};

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

    it('should decrease price when action is MENU_DECREASE_PRICE', () => {
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
      const action = {type: ACTION_TYPES.MENU_DECREASE_PRICE, payload: {amount: 15.5}};

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
  });

  describe('courses', () => {
    it('should add a course when action is MENU_ADD_COURSE and empty dishes', () => {
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
      const action = {type: ACTION_TYPES.MENU_ADD_COURSE, payload: {position: 3, courseTypeId: 5, dishesIds: []}};

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

    it('should add a course when action is MENU_ADD_COURSE and full dishes', () => {
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
        type: ACTION_TYPES.MENU_ADD_COURSE,
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

    it('should get the same original status when action is MENU_REMOVE_COURSE and ' +
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
      const action = {type: ACTION_TYPES.MENU_REMOVE_COURSE, payload: {position: 4, courseTypeId: 'a22'}};

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

    it('should get the same original status when action is MENU_REMOVE_COURSE ' +
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
      const action = {type: ACTION_TYPES.MENU_REMOVE_COURSE, payload: {position: 2, courseTypeId: 'a22'}};

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

    it('should not remove a course when action is MENU_REMOVE_COURSE and position ' +
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
      const action = {type: ACTION_TYPES.MENU_REMOVE_COURSE, payload: {position: 4, courseTypeId: 'a2'}};

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

    it('should remove a course when action is MENU_REMOVE_COURSE and position and courseTypeId valid', () => {
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
      const action = {type: ACTION_TYPES.MENU_REMOVE_COURSE, payload: {position: 2, courseTypeId: 'a2'}};

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

    it('should get the same original status when action is MENU_CHANGE_COURSES_POSITION' +
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
      const action = {
        type: ACTION_TYPES.MENU_CHANGE_COURSES_POSITION,
        payload: {
          newCourses: [],
        },
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

    it('should reorder when action is MENU_CHANGE_COURSES_POSITION', () => {
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
        type: ACTION_TYPES.MENU_CHANGE_COURSES_POSITION,
        payload: {
          newCourses: [
            {position: 1, type: {id: 'a2'}, dishes: [{id: 'a215', extra: '11'}, {id: 'a216'}]},
            {position: 2, type: {id: 'a3'}, dishes: [{id: 'a217'}]},
            {position: 3, type: {id: 'a2'}, dishes: [{id: 'a218'}]},
          ],
        },
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