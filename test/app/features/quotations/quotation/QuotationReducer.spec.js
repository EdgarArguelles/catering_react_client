/* eslint-disable max-lines */
import {expect} from 'chai';
import {ACTION_TYPES as DATA_ACTION_TYPES} from '../../../../../src/app/data/quotations/QuotationsActions';
import {ACTION_TYPES} from '../../../../../src/app/features/quotations/quotation/QuotationActions';
import QuotationReducer from '../../../../../src/app/features/quotations/quotation/QuotationReducer';

describe('Quotations -> Quotation -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      name: '',
      menus: [],
      price: 0,
    };

    const result = QuotationReducer();

    expect(result).to.deep.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      id: 'ID1',
      name: 'name 1',
      menus: [{id: 'menu 1'}, {id: 'menu 2'}],
      price: 500.5,
    };

    const result = QuotationReducer(state, {type: 'invalid'});

    expect(result).to.deep.equal(state);
    // don't mutate
    expect(state).to.deep.equal({
      id: 'ID1',
      name: 'name 1',
      menus: [{id: 'menu 1'}, {id: 'menu 2'}],
      price: 500.5,
    });
  });

  it('should load data when action is QUOTATION_OVERWRITE_LOCAL', () => {
    const state = {
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    };
    const stateExpected = {
      id: 'ID2',
      value: 'value 1',
      menus: [
        {id: 'M1', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: [{price: 33}]}], price: 68.5},
        {id: 'M2', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: []}], price: 35.5},
        {id: 'M3', courses: [{dishes: []}, {dishes: []}], price: 0},
        {id: 'M4', courses: [], extra: 'abc', price: 0},
      ],
    };
    const action = {
      type: DATA_ACTION_TYPES.QUOTATION_OVERWRITE_LOCAL, payload: {
        data: {
          id: 'ID2',
          value: 'value 1',
          menus: [
            {id: 'M1', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: [{price: 33}]}], price: 123},
            {id: 'M2', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: []}]},
            {id: 'M3', courses: [{dishes: []}, {dishes: []}], price: 8},
            {id: 'M4', courses: [], extra: 'abc'},
          ],
        },
      },
    };

    const result = QuotationReducer(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal({
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    });
  });

  it('should load data when action is QUOTATION_OVERWRITE_LOCAL and menus are empty', () => {
    const state = {
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    };
    const stateExpected = {
      id: 'ID2',
      value: 'value 1',
      menus: [],
    };
    const action = {
      type: DATA_ACTION_TYPES.QUOTATION_OVERWRITE_LOCAL, payload: {
        data: {
          id: 'ID2',
          value: 'value 1',
          menus: [],
        },
      },
    };

    const result = QuotationReducer(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal({
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    });
  });

  it('should load data when action is QUOTATION_REVERT', () => {
    const state = {
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    };
    const stateExpected = {
      id: 'ID2',
      value: 'value 1',
      menus: [
        {id: 'M1', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: [{price: 33}]}], price: 68.5},
        {id: 'M2', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: []}], price: 35.5},
        {id: 'M3', courses: [{dishes: []}, {dishes: []}], price: 0},
        {id: 'M4', courses: [], extra: 'abc', price: 0},
      ],
    };
    const action = {
      type: ACTION_TYPES.QUOTATION_REVERT, payload: {
        data: {
          id: 'ID2',
          value: 'value 1',
          menus: [
            {id: 'M1', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: [{price: 33}]}], price: 123},
            {id: 'M2', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: []}]},
            {id: 'M3', courses: [{dishes: []}, {dishes: []}], price: 8},
            {id: 'M4', courses: [], extra: 'abc'},
          ],
        },
      },
    };

    const result = QuotationReducer(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal({
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    });
  });

  it('should load data when action is QUOTATION_REVERT and menus are empty', () => {
    const state = {
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    };
    const stateExpected = {
      id: 'ID2',
      value: 'value 1',
      menus: [],
    };
    const action = {
      type: ACTION_TYPES.QUOTATION_REVERT, payload: {
        data: {
          id: 'ID2',
          value: 'value 1',
          menus: [],
        },
      },
    };

    const result = QuotationReducer(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal({
      id: 'ID1',
      name: 'name 1',
      extra: 'abc',
    });
  });

  describe('name', () => {
    it('should change name value when action is QUOTATION_CHANGE_NAME', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'namE 2',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_CHANGE_NAME, payload: {name: 'namE 2'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });
  });

  describe('menus', () => {
    it('should add a menu when action is QUOTATION_ADD_NEW_MENU', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}, {id: 'menu 3', name: '', quantity: 1, price: 0, courses: []}],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_ADD_NEW_MENU, payload: {menuId: 'menu 3'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should add a menu when action is QUOTATION_ADD_MENU', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}, {id: 'menu 3', name: 'abc'}],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_ADD_MENU, payload: {menu: {id: 'menu 3', name: 'abc'}}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should get the same original status when action is QUOTATION_REMOVE_MENU and menuId is not present', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_REMOVE_MENU, payload: {menuId: 'menu2'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should remove a menu when action is QUOTATION_REMOVE_MENU and menuId is present', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_REMOVE_MENU, payload: {menuId: 'menu 2'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should not select any menu when action is QUOTATION_SELECT_MENU and menuId is not present', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1'},
          {id: 'menu 2', extra: 'abc2', isSelected: true},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1', isSelected: false},
          {id: 'menu 2', extra: 'abc2', isSelected: false},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_SELECT_MENU, payload: {menuId: 'menu2'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1'},
          {id: 'menu 2', extra: 'abc2', isSelected: true},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      });
    });

    it('should update isSelected flag when action is QUOTATION_SELECT_MENU and menuId is present', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1'},
          {id: 'menu 2', extra: 'abc2', isSelected: false},
          {id: 'menu 2', extra: 'abc22', isSelected: true},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1', isSelected: false},
          {id: 'menu 2', extra: 'abc2', isSelected: true},
          {id: 'menu 2', extra: 'abc22', isSelected: true},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      };
      const action = {type: ACTION_TYPES.QUOTATION_SELECT_MENU, payload: {menuId: 'menu 2'}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [
          {id: 'menu 1', extra: 'abc1'},
          {id: 'menu 2', extra: 'abc2', isSelected: false},
          {id: 'menu 2', extra: 'abc22', isSelected: true},
          {id: 'menu 3', isSelected: false, extra: 'abc3'},
        ],
        price: 500.5,
      });
    });

    describe('MenuReducer', () => {
      it('should get the same original status when no one menu is selected', () => {
        const state = {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2', isSelected: false}],
          price: 500.5,
        };
        const stateExpected = {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2', isSelected: false}],
          price: 500.5,
        };

        const result = QuotationReducer(state, {type: 'invalid'});

        expect(result).to.deep.equal(stateExpected);
        // don't mutate
        expect(state).to.deep.equal({
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2', isSelected: false}],
          price: 500.5,
        });
      });

      it('should form selected menu when one menu is selected', () => {
        const state = {
          id: 'ID1',
          name: 'name 1',
          menus: [
            {id: 'menu 1', extra: 'abc1'},
            {id: 'menu 2', extra: 'abc2', isSelected: true},
            {id: 'menu 2', extra: 'abc22', isSelected: true},
            {id: 'menu 3', isSelected: false, extra: 'abc3'},
          ],
          price: 500.5,
        };
        const stateExpected = {
          id: 'ID1',
          name: 'name 1',
          menus: [
            {id: 'menu 1', extra: 'abc1'},
            {id: 'menu 3', isSelected: false, extra: 'abc3'},
            {id: 'menu 2', extra: 'abc2', isSelected: true, name: '', quantity: 1, price: 0, courses: []},
          ],
          price: 500.5,
        };

        const result = QuotationReducer(state, {type: 'invalid'});

        expect(result).to.deep.equal(stateExpected);
        // don't mutate
        expect(state).to.deep.equal({
          id: 'ID1',
          name: 'name 1',
          menus: [
            {id: 'menu 1', extra: 'abc1'},
            {id: 'menu 2', extra: 'abc2', isSelected: true},
            {id: 'menu 2', extra: 'abc22', isSelected: true},
            {id: 'menu 3', isSelected: false, extra: 'abc3'},
          ],
          price: 500.5,
        });
      });
    });
  });

  describe('price', () => {
    it('should set price when action is QUOTATION_SET_PRICE', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 100,
      };
      const action = {type: ACTION_TYPES.QUOTATION_SET_PRICE, payload: {amount: 100}};

      const result = QuotationReducer(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });
  });
});