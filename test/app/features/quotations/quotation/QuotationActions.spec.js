/* eslint-disable max-lines */
import {expect} from 'chai';
import QuotationActions, {ACTION_TYPES} from 'app/features/quotations/quotation/QuotationActions';

describe('Quotations -> Quotation -> Actions', () => {
  describe('changeName', () => {
    it('should dispatch QUOTATION_CHANGE_NAME', () => {
      const name = 'test';

      const result = QuotationActions.changeName(name);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_CHANGE_NAME,
        payload: {
          name,
        },
      });
      // don't mutate
      expect(name).to.deep.equal('test');
    });
  });

  describe('selectMenu', () => {
    it('should dispatch QUOTATION_SELECT_MENU', () => {
      const menuId = 'test';

      const result = QuotationActions.selectMenu(menuId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_SELECT_MENU,
        payload: {
          menuId,
        },
      });
      // don't mutate
      expect(menuId).to.deep.equal('test');
    });
  });

  describe('addNewMenu', () => {
    it('should dispatch QUOTATION_ADD_NEW_MENU', () => {
      const menuId = 'test';

      const result = QuotationActions.addNewMenu(menuId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_ADD_NEW_MENU,
        payload: {
          menuId,
        },
      });
      // don't mutate
      expect(menuId).to.deep.equal('test');
    });
  });

  describe('addMenu', () => {
    it('should dispatch QUOTATION_ADD_MENU', () => {
      const menu = {id: 'M1'};

      const result = QuotationActions.addMenu(menu);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_ADD_MENU,
        payload: {
          menu,
        },
      });
      // don't mutate
      expect(menu).to.deep.equal({id: 'M1'});
    });
  });

  describe('removeMenu', () => {
    it('should dispatch QUOTATION_REMOVE_MENU', () => {
      const menuId = 'test';

      const result = QuotationActions.removeMenu(menuId);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_REMOVE_MENU,
        payload: {
          menuId,
        },
      });
      // don't mutate
      expect(menuId).to.deep.equal('test');
    });
  });

  describe('setPrice', () => {
    it('should dispatch QUOTATION_SET_PRICE', () => {
      const amount = 5;

      const result = QuotationActions.setPrice(amount);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_SET_PRICE,
        payload: {
          amount,
        },
      });
      // don't mutate
      expect(amount).to.deep.equal(5);
    });
  });

  describe('revertQuotation', () => {
    it('should dispatch QUOTATION_REVERT', () => {
      const quotation = {id: 'Q1'};

      const result = QuotationActions.revertQuotation(quotation);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.QUOTATION_REVERT,
        payload: {
          data: quotation,
        },
      });
      // don't mutate
      expect(quotation).to.deep.equal({id: 'Q1'});
    });
  });
});