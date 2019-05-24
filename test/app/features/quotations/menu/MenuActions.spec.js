/* eslint-disable max-lines */
import {expect} from 'chai';
import MenuActions, {ACTION_TYPES} from '../../../../../src/app/features/quotations/menu/MenuActions';

describe('Quotations -> Menu -> Actions', () => {
  describe('changeName', () => {
    it('should dispatch MENU_CHANGE_NAME', () => {
      const name = 'test';

      const result = MenuActions.changeName(name);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_CHANGE_NAME,
        payload: {
          name,
        },
      });
      // don't mutate
      expect(name).to.deep.equal('test');
    });
  });

  describe('changeQuantity', () => {
    it('should dispatch MENU_CHANGE_QUANTITY', () => {
      const quantity = 5;

      const result = MenuActions.changeQuantity(quantity);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_CHANGE_QUANTITY,
        payload: {
          quantity,
        },
      });
      // don't mutate
      expect(quantity).to.deep.equal(5);
    });
  });

  describe('addCourse', () => {
    it('should dispatch MENU_ADD_COURSE', () => {
      const courseTypeId = 'CT1';
      const dishesIds = ['D1', 'D2', 'D3'];
      const position = 5;

      const result = MenuActions.addCourse(courseTypeId, dishesIds, position);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_ADD_COURSE,
        payload: {
          courseTypeId,
          dishesIds,
          position,
        },
      });
      // don't mutate
      expect(courseTypeId).to.deep.equal('CT1');
      expect(dishesIds).to.deep.equal(['D1', 'D2', 'D3']);
      expect(position).to.deep.equal(5);
    });
  });

  describe('removeCourse', () => {
    it('should dispatch MENU_REMOVE_COURSE', () => {
      const courseTypeId = 'CT1';
      const position = 5;

      const result = MenuActions.removeCourse(courseTypeId, position);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_REMOVE_COURSE,
        payload: {
          courseTypeId,
          position,
        },
      });
      // don't mutate
      expect(courseTypeId).to.deep.equal('CT1');
      expect(position).to.deep.equal(5);
    });
  });

  describe('increasePrice', () => {
    it('should dispatch MENU_INCREASE_PRICE', () => {
      const amount = 5;

      const result = MenuActions.increasePrice(amount);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_INCREASE_PRICE,
        payload: {
          amount,
        },
      });
      // don't mutate
      expect(amount).to.deep.equal(5);
    });
  });

  describe('decreasePrice', () => {
    it('should dispatch MENU_DECREASE_PRICE', () => {
      const amount = 5;

      const result = MenuActions.decreasePrice(amount);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_DECREASE_PRICE,
        payload: {
          amount,
        },
      });
      // don't mutate
      expect(amount).to.deep.equal(5);
    });
  });

  describe('changeCoursesPosition', () => {
    it('should dispatch MENU_CHANGE_COURSES_POSITION', () => {
      const newCourses = ['C1', 'C2', 'C3'];

      const result = MenuActions.changeCoursesPosition(newCourses);

      expect(result).to.deep.equal({
        type: ACTION_TYPES.MENU_CHANGE_COURSES_POSITION,
        payload: {
          newCourses,
        },
      });
      // don't mutate
      expect(newCourses).to.deep.equal(['C1', 'C2', 'C3']);
    });
  });
});