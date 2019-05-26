/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import {
  areAllDishesPresent,
  fetchDishesList,
  getActiveDishes,
  getDishesPrice,
  isDishAdded,
} from 'app/features/quotations/dish/Dish.service';

describe('Quotations -> Dish -> Service', () => {
  describe('areAllDishesPresent', () => {
    let allDishes, dishes;

    beforeEach(() => {
      dishes = [{id: 'id1'}, {id: 'id5'}];
      allDishes = {id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}};
    });

    describe('dishes', () => {
      it('should get true when dishes is undefined', () => {
        dishes = undefined;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.true;
        // don't mutate
        expect(dishes).to.deep.equal(undefined);
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is null', () => {
        dishes = null;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.true;
        // don't mutate
        expect(dishes).to.deep.equal(null);
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is empty', () => {
        dishes = [];

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.true;
        // don't mutate
        expect(dishes).to.deep.equal([]);
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get false when dishes is array and all dishes are not present', () => {
        dishes = [{id: 'id1'}, {id: 'id6'}];

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.false;
        // don't mutate
        expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id6'}]);
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get false when dishes is object and all dishes are not present', () => {
        dishes = {id1: {id: 'id1'}, id6: {id: 'id6'}};

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.false;
        // don't mutate
        expect(dishes).to.deep.equal({id1: {id: 'id1'}, id6: {id: 'id6'}});
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is object and all dishes are present', () => {
        dishes = {id1: {id: 'id1'}, id5: {id: 'id5'}};

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.true;
        // don't mutate
        expect(dishes).to.deep.equal({id1: {id: 'id1'}, id5: {id: 'id5'}});
        expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });
    });

    describe('allDishes', () => {
      it('should get false when allDishes is undefined', () => {
        allDishes = undefined;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.false;
        // don't mutate
        expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id5'}]);
        expect(allDishes).to.deep.equal(undefined);
      });

      it('should get false when allDishes is null', () => {
        allDishes = null;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).to.be.false;
        // don't mutate
        expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id5'}]);
        expect(allDishes).to.deep.equal(null);
      });
    });

    it('should get false when not parameters', () => {
      const result = areAllDishesPresent();

      expect(result).to.be.false;
    });

    it('should get true when dishes are present in allDishes', () => {
      const result = areAllDishesPresent(dishes, allDishes);

      expect(result).to.be.true;
      // don't mutate
      expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id5'}]);
      expect(allDishes).to.deep.equal({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
    });
  });

  describe('getActiveDishes', () => {
    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getActiveDishes();

      expect(result).to.deep.equal(resultExpected);
    });

    it('should get empty array when dishes is null', () => {
      const dishes = null;
      const resultExpected = [];

      const result = getActiveDishes(dishes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(dishes).to.deep.equal(null);
    });

    it('should get empty array when dishes is empty', () => {
      const dishes = [];
      const resultExpected = [];

      const result = getActiveDishes(dishes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(dishes).to.deep.equal([]);
    });

    it('should exclude inactive when dishes is array', () => {
      const dishes = [
        {id: 5},
        {id: 1, status: 0},
        {id: 15, status: 1},
        {id: 3, status: 1},
      ];
      const resultExpected = [
        {id: 15, status: 1},
        {id: 3, status: 1},
      ];

      const result = getActiveDishes(dishes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(dishes).to.deep.equal([
        {id: 5},
        {id: 1, status: 0},
        {id: 15, status: 1},
        {id: 3, status: 1},
      ]);
    });

    it('should exclude inactive when dishes is object', () => {
      const dishes = {
        a5: {id: 5},
        a1: {id: 1, status: 0},
        a15: {id: 15, status: 1},
        a3: {id: 3, status: 1},
      };
      const resultExpected = [
        {id: 15, status: 1},
        {id: 3, status: 1},
      ];

      const result = getActiveDishes(dishes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(dishes).to.deep.equal({
        a5: {id: 5},
        a1: {id: 1, status: 0},
        a15: {id: 15, status: 1},
        a3: {id: 3, status: 1},
      });
    });
  });

  describe('isDishAdded', () => {
    let dishId, menuCourses, multipleDishesDialog;

    describe('isDishAddedInMultipleDishesDialog', () => {
      beforeEach(() => {
        dishId = 'd2';
        menuCourses = null;
        multipleDishesDialog = {isMultipleDishesDialogOpen: true, dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}]};
      });

      describe('multipleDishesDialog', () => {
        it('should get false when dishes is multipleDishesDialog is undefined', () => {
          multipleDishesDialog.dishes = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: undefined,
          });
        });

        it('should get false when dishes is multipleDishesDialog is null', () => {
          multipleDishesDialog.dishes = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: null,
          });
        });

        it('should get false when dishes is multipleDishesDialog is empty', () => {
          multipleDishesDialog.dishes = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [],
          });
        });
      });

      describe('menuCourses', () => {
        it('should get true when menuCourses is undefined', () => {
          menuCourses = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(undefined);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get true when menuCourses is empty', () => {
          menuCourses = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([]);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get true when menuCourses has values', () => {
          menuCourses = [{id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]}, {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]}];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });
      });

      describe('dishId', () => {
        it('should get false when dishId is undefined', () => {
          dishId = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal(undefined);
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get false when dishId is null', () => {
          dishId = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal(null);
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get false when dishId is not present', () => {
          dishId = 'd4';

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d4');
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });
      });

      it('should get true when dishId is present', () => {
        const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

        expect(result).to.be.true;
        // don't mutate
        expect(dishId).to.deep.equal('d2');
        expect(menuCourses).to.deep.equal(null);
        expect(multipleDishesDialog).to.deep.equal({
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
        });
      });
    });

    describe('isDishAddedInMenu', () => {
      beforeEach(() => {
        dishId = 'd2';
        menuCourses = [{id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]}, {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]}];
        multipleDishesDialog = null;
      });

      describe('multipleDishesDialog', () => {
        it('should get true when multipleDishesDialog is undefined', () => {
          multipleDishesDialog = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal(undefined);
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is undefined', () => {
          multipleDishesDialog = {};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal({});
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is null', () => {
          multipleDishesDialog = {isMultipleDishesDialogOpen: null};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal({isMultipleDishesDialogOpen: null});
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is false', () => {
          multipleDishesDialog = {isMultipleDishesDialogOpen: false};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.true;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal({isMultipleDishesDialogOpen: false});
        });
      });

      describe('menuCourses', () => {
        it('should get false when menuCourses is undefined', () => {
          menuCourses = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(undefined);
          expect(multipleDishesDialog).to.deep.equal(null);
        });

        it('should get false when menuCourses is null', () => {
          menuCourses = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal(null);
          expect(multipleDishesDialog).to.deep.equal(null);
        });

        it('should get false when menuCourses is empty', () => {
          menuCourses = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([]);
          expect(multipleDishesDialog).to.deep.equal(null);
        });

        it('should get false when menuCourses does not have dishes', () => {
          menuCourses = [{id: 'c1'}, {id: 'c2'}];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d2');
          expect(menuCourses).to.deep.equal([{id: 'c1'}, {id: 'c2'}]);
          expect(multipleDishesDialog).to.deep.equal(null);
        });
      });

      describe('dishId', () => {
        it('should get false when dishId is undefined', () => {
          dishId = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal(undefined);
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal(null);
        });

        it('should get false when dishId is null', () => {
          dishId = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal(null);
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal(null);
        });

        it('should get false when dishId is not present', () => {
          dishId = 'd3';

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).to.be.false;
          // don't mutate
          expect(dishId).to.deep.equal('d3');
          expect(menuCourses).to.deep.equal([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).to.deep.equal(null);
        });
      });

      it('should get true when dishId is present', () => {
        const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

        expect(result).to.be.true;
        // don't mutate
        expect(dishId).to.deep.equal('d2');
        expect(menuCourses).to.deep.equal([
          {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
          {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
        ]);
        expect(multipleDishesDialog).to.deep.equal(null);
      });
    });

    it('should get false when not parameters', () => {
      const result = isDishAdded();

      expect(result).to.be.false;
    });
  });

  describe('getDishesPrice', () => {
    let allDishes, dishes;

    beforeEach(() => {
      dishes = [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}];
      allDishes = {
        id1: {price: 20},
        id2: {extra: 45},
        id4: {price: 23.5, extra: 'abc'},
      };
    });

    describe('dishes', () => {
      it('should get 0 when dishes is undefined', () => {
        dishes = undefined;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).to.equal(resultExpected);
        // don't mutate
        expect(dishes).to.deep.equal(undefined);
        expect(allDishes).to.deep.equal({
          id1: {price: 20},
          id2: {extra: 45},
          id4: {price: 23.5, extra: 'abc'},
        });
      });

      it('should get 0 when dishes is null', () => {
        dishes = null;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).to.equal(resultExpected);
        // don't mutate
        expect(dishes).to.deep.equal(null);
        expect(allDishes).to.deep.equal({
          id1: {price: 20},
          id2: {extra: 45},
          id4: {price: 23.5, extra: 'abc'},
        });
      });

      it('should get 0 when dishes is empty', () => {
        dishes = [];
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).to.equal(resultExpected);
        // don't mutate
        expect(dishes).to.deep.equal([]);
        expect(allDishes).to.deep.equal({
          id1: {price: 20},
          id2: {extra: 45},
          id4: {price: 23.5, extra: 'abc'},
        });
      });
    });

    describe('allDishes', () => {
      it('should get 0 when allDishes is undefined', () => {
        allDishes = undefined;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).to.equal(resultExpected);
        // don't mutate
        expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
        expect(allDishes).to.deep.equal(undefined);
      });

      it('should get 0 when allDishes is null', () => {
        allDishes = null;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).to.equal(resultExpected);
        // don't mutate
        expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
        expect(allDishes).to.deep.equal(null);
      });
    });

    it('should get 0 when not parameters', () => {
      const resultExpected = 0;

      const result = getDishesPrice();

      expect(result).to.equal(resultExpected);
    });

    it('should calculate price when data is correct', () => {
      const resultExpected = 43.5;

      const result = getDishesPrice(dishes, allDishes);

      expect(result).to.equal(resultExpected);
      // don't mutate
      expect(dishes).to.deep.equal([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
      expect(allDishes).to.deep.equal({
        id1: {price: 20},
        id2: {extra: 45},
        id4: {price: 23.5, extra: 'abc'},
      });
    });
  });

  describe('fetchDishesList', () => {
    let allDishes, dishFetching, dishes, fetchDish;

    beforeEach(() => {
      allDishes = {a5: {}, a9: {}, a10: {}};
      dishFetching = {a3: false, a4: true, a20: true};
      dishes = [{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}];
      fetchDish = sinon.stub();
    });

    describe('dishes', () => {
      it('should not call fetchDish when dishes is undefined', () => {
        dishes = undefined;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 0);
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal(undefined);
      });

      it('should not call fetchDish when dishes is null', () => {
        dishes = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 0);
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal(null);
      });

      it('should not call fetchDish when dishes is empty', () => {
        dishes = [];

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 0);
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([]);
      });

      it('should call fetchDish 2 times when dishes does not have id', () => {
        dishes = [{id2: 'a1'}, {id2: 'a2'}];

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 2);
        sinon.assert.calledWithExactly(fetchDish, undefined);
        sinon.assert.calledWithExactly(fetchDish, undefined);
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([{id2: 'a1'}, {id2: 'a2'}]);
      });
    });

    describe('allDishes', () => {
      it('should call fetchDish 5 times when allDishes is undefined', () => {
        allDishes = undefined;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 5);
        sinon.assert.calledWithExactly(fetchDish, 'a1');
        sinon.assert.calledWithExactly(fetchDish, 'a2');
        sinon.assert.calledWithExactly(fetchDish, 'a3');
        sinon.assert.calledWithExactly(fetchDish, 'a5');
        sinon.assert.calledWithExactly(fetchDish, 'a6');
        // don't mutate
        expect(allDishes).to.deep.equal(undefined);
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });

      it('should call fetchDish 5 times when allDishes is null', () => {
        allDishes = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 5);
        sinon.assert.calledWithExactly(fetchDish, 'a1');
        sinon.assert.calledWithExactly(fetchDish, 'a2');
        sinon.assert.calledWithExactly(fetchDish, 'a3');
        sinon.assert.calledWithExactly(fetchDish, 'a5');
        sinon.assert.calledWithExactly(fetchDish, 'a6');
        // don't mutate
        expect(allDishes).to.deep.equal(null);
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });
    });

    describe('dishFetching', () => {
      it('should call fetchDish 5 times when dishFetching is undefined', () => {
        dishFetching = undefined;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 5);
        sinon.assert.calledWithExactly(fetchDish, 'a1');
        sinon.assert.calledWithExactly(fetchDish, 'a2');
        sinon.assert.calledWithExactly(fetchDish, 'a3');
        sinon.assert.calledWithExactly(fetchDish, 'a4');
        sinon.assert.calledWithExactly(fetchDish, 'a6');
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal(undefined);
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });

      it('should call fetchDish 5 times when dishFetching is null', () => {
        dishFetching = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 5);
        sinon.assert.calledWithExactly(fetchDish, 'a1');
        sinon.assert.calledWithExactly(fetchDish, 'a2');
        sinon.assert.calledWithExactly(fetchDish, 'a3');
        sinon.assert.calledWithExactly(fetchDish, 'a4');
        sinon.assert.calledWithExactly(fetchDish, 'a6');
        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal(null);
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });
    });

    describe('fetchDish', () => {
      it('should not break when fetchDish is undefined', () => {
        fetchDish = undefined;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });

      it('should not break when fetchDish is null', () => {
        fetchDish = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        // don't mutate
        expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
        expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });
    });

    it('should not call fetchDish when not parameters', () => {
      fetchDishesList();

      sinon.assert.callCount(fetchDish, 0);
      // don't mutate
      expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
      expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
      expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
    });

    it('should call fetchDish 4 times when dishFetching includes 1 id and one id is present in allDishes', () => {
      fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

      sinon.assert.callCount(fetchDish, 4);
      sinon.assert.calledWithExactly(fetchDish, 'a1');
      sinon.assert.calledWithExactly(fetchDish, 'a2');
      sinon.assert.calledWithExactly(fetchDish, 'a3');
      sinon.assert.calledWithExactly(fetchDish, 'a6');
      // don't mutate
      expect(allDishes).to.deep.equal({a5: {}, a9: {}, a10: {}});
      expect(dishFetching).to.deep.equal({a3: false, a4: true, a20: true});
      expect(dishes).to.deep.equal([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
    });
  });
});