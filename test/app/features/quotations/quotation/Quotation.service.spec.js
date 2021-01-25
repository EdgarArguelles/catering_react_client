/* eslint-disable max-lines */
import sinon from 'sinon';
import {
  areEqual,
  fetchCompleteQuotation,
  getEditPath,
  isQuotationStarted,
} from 'app/features/quotations/quotation/Quotation.service';

describe('Quotations -> Quotation -> Service', () => {
  describe('isQuotationStarted', () => {
    it('should return false when quotation is undefined', () => {
      const quotation = undefined;

      const result = isQuotationStarted(quotation);

      expect(result).toBeFalsy();
      // don't mutate
      expect(quotation).toBeUndefined();
    });

    it('should return false when quotation is null', () => {
      const quotation = null;

      const result = isQuotationStarted(quotation);

      expect(result).toBeFalsy();
      // don't mutate
      expect(quotation).toStrictEqual(null);
    });

    it('should return true when name is not empty', () => {
      const quotation = {name: 'test'};

      const result = isQuotationStarted(quotation);

      expect(result).toBeTruthy();
      // don't mutate
      expect(quotation).toStrictEqual({name: 'test'});
    });

    it('should return false when menus is undefined', () => {
      const quotation = {name: ''};

      const result = isQuotationStarted(quotation);

      expect(result).toBeFalsy();
      // don't mutate
      expect(quotation).toStrictEqual({name: ''});
    });

    it('should return false when all menus are not selected', () => {
      const quotation = {name: '', menus: [{id: 'M1'}, {id: 'M2', isSelected: false}]};

      const result = isQuotationStarted(quotation);

      expect(result).toBeFalsy();
      // don't mutate
      expect(quotation).toStrictEqual({name: '', menus: [{id: 'M1'}, {id: 'M2', isSelected: false}]});
    });

    it('should return true when a menu is selected', () => {
      const quotation = {menus: [{id: 'M1'}, {id: 'M2', isSelected: false}, {id: 'M3', isSelected: true}]};

      const result = isQuotationStarted(quotation);

      expect(result).toBeTruthy();
      // don't mutate
      expect(quotation).toStrictEqual({
        menus: [{id: 'M1'}, {id: 'M2', isSelected: false}, {
          id: 'M3',
          isSelected: true,
        }],
      });
    });
  });

  describe('getEditPath', () => {
    const editQuotationPath = '/presupuestos/editar';
    const editMenuPath = '/presupuestos/menu/editar';

    it('should get editQuotationPath when quotation is undefined', () => {
      const quotation = undefined;

      const result = getEditPath(quotation);

      expect(result).toStrictEqual(editQuotationPath);
      // don't mutate
      expect(quotation).toBeUndefined();
    });

    it('should get editQuotationPath when quotation is null', () => {
      const quotation = null;

      const result = getEditPath(quotation);

      expect(result).toStrictEqual(editQuotationPath);
      // don't mutate
      expect(quotation).toStrictEqual(null);
    });

    it('should get editQuotationPath when menus is undefined', () => {
      const quotation = {id: 'Q1'};

      const result = getEditPath(quotation);

      expect(result).toStrictEqual(editQuotationPath);
      // don't mutate
      expect(quotation).toStrictEqual({id: 'Q1'});
    });

    it('should get editQuotationPath when all menus are not selected', () => {
      const quotation = {id: 'Q1', menus: [{id: 'M1'}, {id: 'M2', isSelected: false}]};

      const result = getEditPath(quotation);

      expect(result).toStrictEqual(editQuotationPath);
      // don't mutate
      expect(quotation).toStrictEqual({id: 'Q1', menus: [{id: 'M1'}, {id: 'M2', isSelected: false}]});
    });

    it('should get editMenuPath when a menu is selected', () => {
      const quotation = {id: 'Q1', menus: [{id: 'M1'}, {id: 'M2', isSelected: false}, {id: 'M3', isSelected: true}]};

      const result = getEditPath(quotation);

      expect(result).toStrictEqual(editMenuPath);
      // don't mutate
      expect(quotation).toStrictEqual({
        id: 'Q1',
        menus: [{id: 'M1'}, {id: 'M2', isSelected: false}, {id: 'M3', isSelected: true}],
      });
    });
  });

  describe('areEqual', () => {
    let quotation1, quotation2;

    beforeEach(() => {
      quotation1 = {
        id: 'Q1',
        price: 50.68,
        menus: [
          {
            name: 'ZZ',
            price: 123,
            isSelected: false,
            courses: [{id: 'A', position: 1}, {id: 'C', position: 2}, {id: 'C', position: 1}, {
              id: 'B',
              position: 1,
              dishes: 'test',
            }],
            extra: 'extra M1',
          },
          {
            name: 'AA',
            courses: [],
          },
        ],
        extra: 'extra',
      };
      quotation2 = {
        id: 'Q1',
        price: 50.52,
        menus: [
          {
            name: 'AA',
            price: 45.58,
            isSelected: true,
            courses: [],
          },
          {
            name: 'ZZ',
            price: 44,
            isSelected: true,
            courses: [{id: 'B', position: 1}, {id: 'C', position: 2}, {id: 'A', position: 1, dishes: []}, {
              id: 'C',
              position: 1,
            }],
            extra: 'extra M1',
          },
        ],
        extra: 'extra',
      };
    });

    describe('quotation1', () => {
      it('should return false when quotation1 is undefined', () => {
        quotation1 = undefined;

        const result = areEqual(quotation1, quotation2);

        expect(result).toBeFalsy();
        // don't mutate
        expect(quotation1).toBeUndefined();
        expect(quotation2).toStrictEqual({
          id: 'Q1',
          price: 50.52,
          menus: [
            {
              name: 'AA',
              price: 45.58,
              isSelected: true,
              courses: [],
            },
            {
              name: 'ZZ',
              price: 44,
              isSelected: true,
              courses: [{id: 'B', position: 1}, {id: 'C', position: 2}, {id: 'A', position: 1, dishes: []}, {
                id: 'C',
                position: 1,
              }],
              extra: 'extra M1',
            },
          ],
          extra: 'extra',
        });
      });

      it('should return false when quotation1 is null', () => {
        quotation1 = null;

        const result = areEqual(quotation1, quotation2);

        expect(result).toBeFalsy();
        // don't mutate
        expect(quotation1).toStrictEqual(null);
        expect(quotation2).toStrictEqual({
          id: 'Q1',
          price: 50.52,
          menus: [
            {
              name: 'AA',
              price: 45.58,
              isSelected: true,
              courses: [],
            },
            {
              name: 'ZZ',
              price: 44,
              isSelected: true,
              courses: [{id: 'B', position: 1}, {id: 'C', position: 2}, {id: 'A', position: 1, dishes: []}, {
                id: 'C',
                position: 1,
              }],
              extra: 'extra M1',
            },
          ],
          extra: 'extra',
        });
      });
    });

    describe('quotation2', () => {
      it('should return false when quotation2 is undefined', () => {
        quotation2 = undefined;

        const result = areEqual(quotation1, quotation2);

        expect(result).toBeFalsy();
        // don't mutate
        expect(quotation1).toStrictEqual({
          id: 'Q1',
          price: 50.68,
          menus: [
            {
              name: 'ZZ',
              price: 123,
              isSelected: false,
              courses: [{id: 'A', position: 1}, {id: 'C', position: 2}, {id: 'C', position: 1}, {
                id: 'B',
                position: 1,
                dishes: 'test',
              }],
              extra: 'extra M1',
            },
            {
              name: 'AA',
              courses: [],
            },
          ],
          extra: 'extra',
        });
        expect(quotation2).toBeUndefined();
      });

      it('should return false when quotation2 is null', () => {
        quotation2 = null;

        const result = areEqual(quotation1, quotation2);

        expect(result).toBeFalsy();
        // don't mutate
        expect(quotation1).toStrictEqual({
          id: 'Q1',
          price: 50.68,
          menus: [
            {
              name: 'ZZ',
              price: 123,
              isSelected: false,
              courses: [{id: 'A', position: 1}, {id: 'C', position: 2}, {id: 'C', position: 1}, {
                id: 'B',
                position: 1,
                dishes: 'test',
              }],
              extra: 'extra M1',
            },
            {
              name: 'AA',
              courses: [],
            },
          ],
          extra: 'extra',
        });
        expect(quotation2).toStrictEqual(null);
      });
    });

    it('should return true when both are undefined', () => {
      quotation1 = undefined;
      quotation2 = undefined;

      const result = areEqual(quotation1, quotation2);

      expect(result).toBeTruthy();
      // don't mutate
      expect(quotation1).toBeUndefined();
      expect(quotation2).toBeUndefined();
    });

    it('should return true when both are null', () => {
      quotation1 = null;
      quotation2 = null;

      const result = areEqual(quotation1, quotation2);

      expect(result).toBeTruthy();
      // don't mutate
      expect(quotation1).toStrictEqual(null);
      expect(quotation2).toStrictEqual(null);
    });

    it('should return true when both are equal', () => {
      const result = areEqual(quotation1, quotation2);

      expect(result).toBeTruthy();
      // don't mutate quotation1
      expect(quotation1).toStrictEqual({
        id: 'Q1',
        price: 50.68,
        menus: [
          {
            name: 'ZZ',
            price: 123,
            isSelected: false,
            courses: [{id: 'A', position: 1}, {id: 'C', position: 2}, {id: 'C', position: 1}, {
              id: 'B',
              position: 1,
              dishes: 'test',
            }],
            extra: 'extra M1',
          },
          {
            name: 'AA',
            courses: [],
          },
        ],
        extra: 'extra',
      });

      // don't mutate quotation2
      expect(quotation2).toStrictEqual({
        id: 'Q1',
        price: 50.52,
        menus: [
          {
            name: 'AA',
            price: 45.58,
            isSelected: true,
            courses: [],
          },
          {
            name: 'ZZ',
            price: 44,
            isSelected: true,
            courses: [{id: 'B', position: 1}, {id: 'C', position: 2}, {id: 'A', position: 1, dishes: []}, {
              id: 'C',
              position: 1,
            }],
            extra: 'extra M1',
          },
        ],
        extra: 'extra',
      });
    });

    it('should return true when both are equal and menus is null', () => {
      quotation1 = {
        id: 'Q1',
        price: 50.68,
        extra: 'extra',
      };
      quotation2.menus = null;

      const result = areEqual(quotation1, quotation2);

      expect(result).toBeTruthy();
      // don't mutate quotation1
      expect(quotation1).toStrictEqual({
        id: 'Q1',
        price: 50.68,
        extra: 'extra',
      });

      // don't mutate quotation2
      expect(quotation2).toStrictEqual({
        id: 'Q1',
        price: 50.52,
        menus: null,
        extra: 'extra',
      });
    });

    it('should return false when both are not equal', () => {
      quotation2.id = 'Q2';

      const result = areEqual(quotation1, quotation2);

      expect(result).toBeFalsy();
      // don't mutate quotation1
      expect(quotation1).toStrictEqual({
        id: 'Q1',
        price: 50.68,
        menus: [
          {
            name: 'ZZ',
            price: 123,
            isSelected: false,
            courses: [{id: 'A', position: 1}, {id: 'C', position: 2}, {id: 'C', position: 1}, {
              id: 'B',
              position: 1,
              dishes: 'test',
            }],
            extra: 'extra M1',
          },
          {
            name: 'AA',
            courses: [],
          },
        ],
        extra: 'extra',
      });

      // don't mutate quotation2
      expect(quotation2).toStrictEqual({
        id: 'Q2',
        price: 50.52,
        menus: [
          {
            name: 'AA',
            price: 45.58,
            isSelected: true,
            courses: [],
          },
          {
            name: 'ZZ',
            price: 44,
            isSelected: true,
            courses: [{id: 'B', position: 1}, {id: 'C', position: 2}, {id: 'A', position: 1, dishes: []}, {
              id: 'C',
              position: 1,
            }],
            extra: 'extra M1',
          },
        ],
        extra: 'extra',
      });
    });
  });

  describe('fetchCompleteQuotation', () => {
    let fetchQuotation, isFetching, quotation, quotations;

    beforeEach(() => {
      quotation = {id: 'test3', name: 'ABC'};
      isFetching = false;
      quotations = {test1: {id: 'test1', name: 'A', menus: []}, test2: {id: 'test2', name: 'B', menus: []}};
      fetchQuotation = sinon.stub();
    });

    describe('quotation', () => {
      it('should not call fetchQuotation when quotation is undefined', () => {
        quotation = undefined;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 0);
        // don't mutate
        expect(quotation).toBeUndefined();
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });

      it('should not call fetchQuotation when quotation is null', () => {
        quotation = null;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 0);
        // don't mutate
        expect(quotation).toStrictEqual(null);
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });

      it('should not call fetchQuotation when quotation does not have id', () => {
        quotation = {name: 'ABC'};

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 0);
        // don't mutate
        expect(quotation).toStrictEqual({name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });
    });

    describe('isFetching', () => {
      it('should call fetchQuotation when isFetching is undefined', () => {
        isFetching = undefined;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 1);
        sinon.assert.calledWithExactly(fetchQuotation, 'test3');
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toBeUndefined();
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });

      it('should call fetchQuotation when isFetching is null', () => {
        isFetching = null;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 1);
        sinon.assert.calledWithExactly(fetchQuotation, 'test3');
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(null);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });

      it('should not call fetchQuotation when isFetching is true', () => {
        isFetching = true;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 0);
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(true);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });
    });

    describe('quotations', () => {
      it('should call fetchQuotation when quotations is undefined', () => {
        quotations = undefined;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 1);
        sinon.assert.calledWithExactly(fetchQuotation, 'test3');
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toBeUndefined();
      });

      it('should call fetchQuotation when quotations is null', () => {
        quotations = null;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 1);
        sinon.assert.calledWithExactly(fetchQuotation, 'test3');
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual(null);
      });

      it('should call fetchQuotation when quotations is present without menus', () => {
        quotations = {test1: {id: 'test1', name: 'A', menus: []}, test3: {id: 'test3', name: 'B'}};

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 1);
        sinon.assert.calledWithExactly(fetchQuotation, 'test3');
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({test1: {id: 'test1', name: 'A', menus: []}, test3: {id: 'test3', name: 'B'}});
      });

      it('should not call fetchQuotation when quotations is present with menus', () => {
        quotations = {test1: {id: 'test1', name: 'A', menus: []}, test3: {id: 'test3', name: 'B', menus: []}};

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        sinon.assert.callCount(fetchQuotation, 0);
        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test3: {id: 'test3', name: 'B', menus: []},
        });
      });
    });

    describe('fetchQuotation', () => {
      it('should not break when fetchQuotation is undefined', () => {
        fetchQuotation = undefined;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });

      it('should not break when fetchQuotation is null', () => {
        fetchQuotation = null;

        fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

        // don't mutate
        expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
        expect(isFetching).toStrictEqual(false);
        expect(quotations).toStrictEqual({
          test1: {id: 'test1', name: 'A', menus: []},
          test2: {id: 'test2', name: 'B', menus: []},
        });
      });
    });

    it('should not call fetchQuotation when not parameters', () => {
      fetchCompleteQuotation();

      sinon.assert.callCount(fetchQuotation, 0);
      // don't mutate
      expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
      expect(isFetching).toStrictEqual(false);
      expect(quotations).toStrictEqual({
        test1: {id: 'test1', name: 'A', menus: []},
        test2: {id: 'test2', name: 'B', menus: []},
      });
    });

    it('should call fetchQuotation when quotation is not present', () => {
      fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);

      sinon.assert.callCount(fetchQuotation, 1);
      sinon.assert.calledWithExactly(fetchQuotation, 'test3');
      // don't mutate
      expect(quotation).toStrictEqual({id: 'test3', name: 'ABC'});
      expect(isFetching).toStrictEqual(false);
      expect(quotations).toStrictEqual({
        test1: {id: 'test1', name: 'A', menus: []},
        test2: {id: 'test2', name: 'B', menus: []},
      });
    });
  });
});