/* eslint-disable max-lines */
import {fetchQuotation} from 'app/data/quotations/QuotationsReducer';
import QuotationReducer, {
  changeName, selectMenu, addNewMenu, addMenu, removeMenu, setPrice, revertQuotation,
} from 'app/features/quotations/quotation/QuotationReducer';

describe('Quotations -> Quotation -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        name: '',
        menus: [],
        price: 0,
      };

      const result = QuotationReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      };

      const result = QuotationReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should not load data when action is fetchQuotation.fulfilled and overwriteLocalChanges is false', () => {
      const state = {
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      };
      const stateExpected = {
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      };
      const action = {
        type: fetchQuotation.fulfilled.type, payload: {
          overwriteLocalChanges: false,
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

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      });
    });

    it('should load data when action is fetchQuotation.fulfilled and overwriteLocalChanges is true', () => {
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
        type: fetchQuotation.fulfilled.type, payload: {
          overwriteLocalChanges: true,
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

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      });
    });

    it('should load data when action is fetchQuotation.fulfilled and menus are empty', () => {
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
        type: fetchQuotation.fulfilled.type, payload: {
          overwriteLocalChanges: true,
          data: {
            id: 'ID2',
            value: 'value 1',
            menus: [],
          },
        },
      };

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      });
    });

    it('should load data when action is revertQuotation', () => {
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
        type: revertQuotation.type, payload: {
          id: 'ID2',
          value: 'value 1',
          menus: [
            {id: 'M1', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: [{price: 33}]}], price: 123},
            {id: 'M2', courses: [{dishes: [{price: 15}, {price: 20.5}]}, {dishes: []}]},
            {id: 'M3', courses: [{dishes: []}, {dishes: []}], price: 8},
            {id: 'M4', courses: [], extra: 'abc'},
          ],
        },
      };

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      });
    });

    it('should load data when action is revertQuotation and menus are empty', () => {
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
        type: revertQuotation.type, payload: {
          id: 'ID2',
          value: 'value 1',
          menus: [],
        },
      };

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        extra: 'abc',
      });
    });

    it('should change name value when action is changeName', () => {
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
      const action = {type: changeName.type, payload: 'namE 2'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should add a menu when action is addNewMenu', () => {
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
      const action = {type: addNewMenu.type, payload: 'menu 3'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should add a menu when action is addMenu', () => {
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
      const action = {type: addMenu.type, payload: {id: 'menu 3', name: 'abc'}};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should get the same original status when action is removeMenu and menuId is not present', () => {
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
      const action = {type: removeMenu.type, payload: 'menu2'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should remove a menu when action is removeMenu and menuId is present', () => {
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
      const action = {type: removeMenu.type, payload: 'menu 2'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });

    it('should not select any menu when action is selectMenu and menuId is not present', () => {
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
      const action = {type: selectMenu.type, payload: 'menu2'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
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

    it('should update isSelected flag when action is selectMenu and menuId is present', () => {
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
      const action = {type: selectMenu.type, payload: 'menu 2'};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
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

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
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
            {id: 'menu 2', extra: 'abc2', isSelected: true},
          ],
          price: 500.5,
        };

        const result = QuotationReducer(state, {type: 'invalid'});

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
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

    it('should set price when action is setPrice', () => {
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
      const action = {type: setPrice.type, payload: 100};

      const result = QuotationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        id: 'ID1',
        name: 'name 1',
        menus: [{id: 'menu 1'}, {id: 'menu 2'}],
        price: 500.5,
      });
    });
  });
});