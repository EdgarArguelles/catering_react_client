/* eslint-disable max-lines */
import {isDishAdded} from 'app/features/quotations/dish/Dish.service';

describe('Quotations -> Dish -> Service', () => {
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
});