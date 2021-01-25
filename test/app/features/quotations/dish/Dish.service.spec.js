/* eslint-disable max-lines */
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

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishes).toBeUndefined();
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is null', () => {
        dishes = null;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishes).toStrictEqual(null);
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is empty', () => {
        dishes = [];

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishes).toStrictEqual([]);
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get false when dishes is array and all dishes are not present', () => {
        dishes = [{id: 'id1'}, {id: 'id6'}];

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeFalsy();
        // don't mutate
        expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id6'}]);
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get false when dishes is object and all dishes are not present', () => {
        dishes = {id1: {id: 'id1'}, id6: {id: 'id6'}};

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeFalsy();
        // don't mutate
        expect(dishes).toStrictEqual({id1: {id: 'id1'}, id6: {id: 'id6'}});
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });

      it('should get true when dishes is object and all dishes are present', () => {
        dishes = {id1: {id: 'id1'}, id5: {id: 'id5'}};

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishes).toStrictEqual({id1: {id: 'id1'}, id5: {id: 'id5'}});
        expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
      });
    });

    describe('allDishes', () => {
      it('should get false when allDishes is undefined', () => {
        allDishes = undefined;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeFalsy();
        // don't mutate
        expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id5'}]);
        expect(allDishes).toBeUndefined();
      });

      it('should get false when allDishes is null', () => {
        allDishes = null;

        const result = areAllDishesPresent(dishes, allDishes);

        expect(result).toBeFalsy();
        // don't mutate
        expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id5'}]);
        expect(allDishes).toStrictEqual(null);
      });
    });

    it('should get false when not parameters', () => {
      const result = areAllDishesPresent();

      expect(result).toBeFalsy();
    });

    it('should get true when dishes are present in allDishes', () => {
      const result = areAllDishesPresent(dishes, allDishes);

      expect(result).toBeTruthy();
      // don't mutate
      expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id5'}]);
      expect(allDishes).toStrictEqual({id1: {name: 'a'}, id2: {name: 'a2'}, id5: {name: 'a5'}});
    });
  });

  describe('getActiveDishes', () => {
    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getActiveDishes();

      expect(result).toStrictEqual(resultExpected);
    });

    it('should get empty array when dishes is null', () => {
      const dishes = null;
      const resultExpected = [];

      const result = getActiveDishes(dishes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(dishes).toStrictEqual(null);
    });

    it('should get empty array when dishes is empty', () => {
      const dishes = [];
      const resultExpected = [];

      const result = getActiveDishes(dishes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(dishes).toStrictEqual([]);
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(dishes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(dishes).toStrictEqual({
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

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: undefined,
          });
        });

        it('should get false when dishes is multipleDishesDialog is null', () => {
          multipleDishesDialog.dishes = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: null,
          });
        });

        it('should get false when dishes is multipleDishesDialog is empty', () => {
          multipleDishesDialog.dishes = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [],
          });
        });
      });

      describe('menuCourses', () => {
        it('should get true when menuCourses is undefined', () => {
          menuCourses = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toBeUndefined();
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get true when menuCourses is empty', () => {
          menuCourses = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([]);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get true when menuCourses has values', () => {
          menuCourses = [{id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]}, {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]}];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });
      });

      describe('dishId', () => {
        it('should get false when dishId is undefined', () => {
          dishId = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toBeUndefined();
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get false when dishId is null', () => {
          dishId = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual(null);
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });

        it('should get false when dishId is not present', () => {
          dishId = 'd4';

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d4');
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual({
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'd1'}, {id: 'd2'}, {id: 'd3'}],
          });
        });
      });

      it('should get true when dishId is present', () => {
        const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishId).toStrictEqual('d2');
        expect(menuCourses).toStrictEqual(null);
        expect(multipleDishesDialog).toStrictEqual({
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

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toBeUndefined();
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is undefined', () => {
          multipleDishesDialog = {};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual({});
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is null', () => {
          multipleDishesDialog = {isMultipleDishesDialogOpen: null};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual({isMultipleDishesDialogOpen: null});
        });

        it('should get true when isMultipleDishesDialogOpen is multipleDishesDialog is false', () => {
          multipleDishesDialog = {isMultipleDishesDialogOpen: false};

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeTruthy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual({isMultipleDishesDialogOpen: false});
        });
      });

      describe('menuCourses', () => {
        it('should get false when menuCourses is undefined', () => {
          menuCourses = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toBeUndefined();
          expect(multipleDishesDialog).toStrictEqual(null);
        });

        it('should get false when menuCourses is null', () => {
          menuCourses = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual(null);
          expect(multipleDishesDialog).toStrictEqual(null);
        });

        it('should get false when menuCourses is empty', () => {
          menuCourses = [];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([]);
          expect(multipleDishesDialog).toStrictEqual(null);
        });

        it('should get false when menuCourses does not have dishes', () => {
          menuCourses = [{id: 'c1'}, {id: 'c2'}];

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d2');
          expect(menuCourses).toStrictEqual([{id: 'c1'}, {id: 'c2'}]);
          expect(multipleDishesDialog).toStrictEqual(null);
        });
      });

      describe('dishId', () => {
        it('should get false when dishId is undefined', () => {
          dishId = undefined;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toBeUndefined();
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual(null);
        });

        it('should get false when dishId is null', () => {
          dishId = null;

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual(null);
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual(null);
        });

        it('should get false when dishId is not present', () => {
          dishId = 'd3';

          const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

          expect(result).toBeFalsy();
          // don't mutate
          expect(dishId).toStrictEqual('d3');
          expect(menuCourses).toStrictEqual([
            {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
            {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
          ]);
          expect(multipleDishesDialog).toStrictEqual(null);
        });
      });

      it('should get true when dishId is present', () => {
        const result = isDishAdded(multipleDishesDialog, menuCourses, dishId);

        expect(result).toBeTruthy();
        // don't mutate
        expect(dishId).toStrictEqual('d2');
        expect(menuCourses).toStrictEqual([
          {id: 'c1', dishes: [{id: 'd1'}, {id: 'd2'}]},
          {id: 'c2', dishes: [{id: 'd2'}, {id: 'd4'}]},
        ]);
        expect(multipleDishesDialog).toStrictEqual(null);
      });
    });

    it('should get false when not parameters', () => {
      const result = isDishAdded();

      expect(result).toBeFalsy();
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(dishes).toBeUndefined();
        expect(allDishes).toStrictEqual({
          id1: {price: 20},
          id2: {extra: 45},
          id4: {price: 23.5, extra: 'abc'},
        });
      });

      it('should get 0 when dishes is null', () => {
        dishes = null;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(dishes).toStrictEqual(null);
        expect(allDishes).toStrictEqual({
          id1: {price: 20},
          id2: {extra: 45},
          id4: {price: 23.5, extra: 'abc'},
        });
      });

      it('should get 0 when dishes is empty', () => {
        dishes = [];
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(dishes).toStrictEqual([]);
        expect(allDishes).toStrictEqual({
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
        expect(allDishes).toBeUndefined();
      });

      it('should get 0 when allDishes is null', () => {
        allDishes = null;
        const resultExpected = 0;

        const result = getDishesPrice(dishes, allDishes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
        expect(allDishes).toStrictEqual(null);
      });
    });

    it('should get 0 when not parameters', () => {
      const resultExpected = 0;

      const result = getDishesPrice();

      expect(result).toStrictEqual(resultExpected);
    });

    it('should calculate price when data is correct', () => {
      const resultExpected = 43.5;

      const result = getDishesPrice(dishes, allDishes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(dishes).toStrictEqual([{id: 'id1'}, {id: 'id2'}, {id: 'id3'}, {id: 'id4'}]);
      expect(allDishes).toStrictEqual({
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
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toBeUndefined();
      });

      it('should not call fetchDish when dishes is null', () => {
        dishes = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 0);
        // don't mutate
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual(null);
      });

      it('should not call fetchDish when dishes is empty', () => {
        dishes = [];

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 0);
        // don't mutate
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([]);
      });

      it('should call fetchDish 2 times when dishes does not have id', () => {
        dishes = [{id2: 'a1'}, {id2: 'a2'}];

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        sinon.assert.callCount(fetchDish, 2);
        sinon.assert.calledWithExactly(fetchDish, undefined);
        sinon.assert.calledWithExactly(fetchDish, undefined);
        // don't mutate
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([{id2: 'a1'}, {id2: 'a2'}]);
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
        expect(allDishes).toBeUndefined();
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
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
        expect(allDishes).toStrictEqual(null);
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
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
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toBeUndefined();
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
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
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual(null);
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });
    });

    describe('fetchDish', () => {
      it('should not break when fetchDish is undefined', () => {
        fetchDish = undefined;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        // don't mutate
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });

      it('should not break when fetchDish is null', () => {
        fetchDish = null;

        fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

        // don't mutate
        expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
        expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
        expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
      });
    });

    it('should not call fetchDish when not parameters', () => {
      fetchDishesList();

      sinon.assert.callCount(fetchDish, 0);
      // don't mutate
      expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
      expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
      expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
    });

    it('should call fetchDish 4 times when dishFetching includes 1 id and one id is present in allDishes', () => {
      fetchDishesList(dishes, allDishes, dishFetching, fetchDish);

      sinon.assert.callCount(fetchDish, 4);
      sinon.assert.calledWithExactly(fetchDish, 'a1');
      sinon.assert.calledWithExactly(fetchDish, 'a2');
      sinon.assert.calledWithExactly(fetchDish, 'a3');
      sinon.assert.calledWithExactly(fetchDish, 'a6');
      // don't mutate
      expect(allDishes).toStrictEqual({a5: {}, a9: {}, a10: {}});
      expect(dishFetching).toStrictEqual({a3: false, a4: true, a20: true});
      expect(dishes).toStrictEqual([{id: 'a1'}, {id: 'a2'}, {id: 'a3'}, {id: 'a4'}, {id: 'a5'}, {id: 'a6'}]);
    });
  });
});