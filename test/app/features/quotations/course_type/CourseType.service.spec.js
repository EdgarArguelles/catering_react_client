/* eslint-disable max-lines */
import {expect} from 'chai';
import {
  getActiveCourseTypes,
  getCourseTypeDishes,
  getCurrentCourseType,
  getCurrentCourseTypeDishes,
  getSortedCourseTypes,
  useMultipleDishes,
} from '../../../../../src/app/features/quotations/course_type/CourseType.service';

describe('Quotations -> Course Type -> Service', () => {
  describe('getActiveCourseTypes', () => {
    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getActiveCourseTypes();

      expect(result).to.deep.equal(resultExpected);
    });

    it('should get empty array when courseTypes is null', () => {
      const courseTypes = null;
      const resultExpected = [];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal(null);
    });

    it('should get empty array when courseTypes is empty', () => {
      const courseTypes = [];
      const resultExpected = [];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal([]);
    });

    it('should exclude inactive when courseTypes is array', () => {
      const courseTypes = [
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ];
      const resultExpected = [
        {position: 15, status: 1},
        {position: 3, status: 1},
      ];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
    });

    it('should exclude inactive when courseTypes is object', () => {
      const courseTypes = {
        a5: {position: 5},
        a1: {position: 1, status: 0},
        a15: {position: 15, status: 1},
        a3: {position: 3, status: 1},
      };
      const resultExpected = [
        {position: 15, status: 1},
        {position: 3, status: 1},
      ];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal({
        a5: {position: 5},
        a1: {position: 1, status: 0},
        a15: {position: 15, status: 1},
        a3: {position: 3, status: 1},
      });
    });
  });

  describe('getSortedCourseTypes', () => {
    let courseTypes, shouldIncludeInactive;

    beforeEach(() => {
      courseTypes = [
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ];
      shouldIncludeInactive = true;
    });

    describe('courseTypes', () => {
      it('should get empty array when courseTypes is undefined', () => {
        courseTypes = undefined;
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal(undefined);
        expect(shouldIncludeInactive).to.deep.equal(true);
      });

      it('should get empty array when courseTypes is null', () => {
        courseTypes = null;
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal(null);
        expect(shouldIncludeInactive).to.deep.equal(true);
      });

      it('should get empty array when courseTypes is empty', () => {
        courseTypes = [];
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal([]);
        expect(shouldIncludeInactive).to.deep.equal(true);
      });

      it('should get sorted array when courseTypes is object', () => {
        courseTypes = {
          a5: {position: 5},
          a1: {position: 1, status: 0},
          a15: {position: 15, status: 1},
          a3: {position: 3, status: 1},
        };
        const resultExpected = [
          {position: 1, status: 0},
          {position: 3, status: 1},
          {position: 5},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal({
          a5: {position: 5},
          a1: {position: 1, status: 0},
          a15: {position: 15, status: 1},
          a3: {position: 3, status: 1},
        });
        expect(shouldIncludeInactive).to.deep.equal(true);
      });
    });

    describe('shouldIncludeInactive', () => {
      it('should get sorted array when shouldIncludeInactive is undefined', () => {
        shouldIncludeInactive = undefined;
        const resultExpected = [
          {position: 3, status: 1},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).to.deep.equal(undefined);
      });

      it('should get sorted array when shouldIncludeInactive is null', () => {
        shouldIncludeInactive = null;
        const resultExpected = [
          {position: 3, status: 1},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).to.deep.equal(null);
      });

      it('should get sorted array when shouldIncludeInactive is false', () => {
        shouldIncludeInactive = false;
        const resultExpected = [
          {position: 3, status: 1},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseTypes).to.deep.equal([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).to.deep.equal(false);
      });
    });

    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getSortedCourseTypes();

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(shouldIncludeInactive).to.deep.equal(true);
    });

    it('should get sorted array when courseTypes is array', () => {
      const resultExpected = [
        {position: 1, status: 0},
        {position: 3, status: 1},
        {position: 5},
        {position: 15, status: 1},
      ];

      const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseTypes).to.deep.equal([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(shouldIncludeInactive).to.deep.equal(true);
    });
  });

  describe('getCurrentCourseType', () => {
    let allCourseTypes, selectedTab;

    beforeEach(() => {
      allCourseTypes = [
        {position: 5, status: 1},
        {position: 1, status: 1},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ];
      selectedTab = 1;
    });

    describe('allCourseTypes', () => {
      it('should get undefined when allCourseTypes is undefined', () => {
        allCourseTypes = undefined;
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal(undefined);
        expect(selectedTab).to.deep.equal(1);
      });

      it('should get undefined when allCourseTypes is null', () => {
        allCourseTypes = null;
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal(null);
        expect(selectedTab).to.deep.equal(1);
      });

      it('should get undefined when allCourseTypes is empty', () => {
        allCourseTypes = [];
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal([]);
        expect(selectedTab).to.deep.equal(1);
      });

      it('should get second sorted object when allCourseTypes is object', () => {
        allCourseTypes = {
          a5: {position: 5, status: 1},
          a1: {position: 1, status: 1},
          a15: {position: 15, status: 1},
          a3: {position: 3, status: 1},
        };
        const resultExpected = {position: 3, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal({
          a5: {position: 5, status: 1},
          a1: {position: 1, status: 1},
          a15: {position: 15, status: 1},
          a3: {position: 3, status: 1},
        });
        expect(selectedTab).to.deep.equal(1);
      });
    });

    describe('selectedTab', () => {
      it('should get first sorted object when selectedTab is undefined', () => {
        selectedTab = undefined;
        const resultExpected = {position: 1, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).to.deep.equal(undefined);
      });

      it('should get undefined when selectedTab is null', () => {
        selectedTab = null;
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).to.deep.equal(null);
      });

      it('should get third sorted object when selectedTab is 2', () => {
        selectedTab = 2;
        const resultExpected = {position: 5, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).to.deep.equal(2);
      });

      it('should get last sorted object when selectedTab is 4', () => {
        selectedTab = 4;
        const resultExpected = {position: 15, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(allCourseTypes).to.deep.equal([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).to.deep.equal(4);
      });
    });

    it('should get undefined when not parameters', () => {
      const resultExpected = undefined;

      const result = getCurrentCourseType();

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(allCourseTypes).to.deep.equal([
        {position: 5, status: 1},
        {position: 1, status: 1},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(selectedTab).to.deep.equal(1);
    });

    it('should get second sorted object', () => {
      const resultExpected = {position: 3, status: 1};

      const result = getCurrentCourseType(allCourseTypes, selectedTab);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(allCourseTypes).to.deep.equal([
        {position: 5, status: 1},
        {position: 1, status: 1},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(selectedTab).to.deep.equal(1);
    });
  });

  describe('getCourseTypeDishes', () => {
    let allDishes, courseType;

    beforeEach(() => {
      courseType = {id: 'a1'};
      allDishes = [
        {courseTypeId: 'a5'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a3'},
      ];
    });

    describe('allDishes', () => {
      it('should get empty array when allDishes is undefined', () => {
        allDishes = undefined;
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal({id: 'a1'});
        expect(allDishes).to.deep.equal(undefined);
      });

      it('should get empty array when allDishes is null', () => {
        allDishes = null;
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal({id: 'a1'});
        expect(allDishes).to.deep.equal(null);
      });

      it('should get empty array when allDishes is empty', () => {
        allDishes = [];
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal({id: 'a1'});
        expect(allDishes).to.deep.equal([]);
      });

      it('should get filter array when allDishes is object', () => {
        allDishes = {
          a5: {courseTypeId: 'a5'},
          a1: {courseTypeId: 'a1'},
          a15: {courseTypeId: 'a1'},
          a3: {courseTypeId: 'a3'},
        };
        const resultExpected = [
          {courseTypeId: 'a1'},
          {courseTypeId: 'a1'},
        ];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal({id: 'a1'});
        expect(allDishes).to.deep.equal({
          a5: {courseTypeId: 'a5'},
          a1: {courseTypeId: 'a1'},
          a15: {courseTypeId: 'a1'},
          a3: {courseTypeId: 'a3'},
        });
      });
    });

    describe('courseType', () => {
      it('should get empty array when courseType is undefined', () => {
        courseType = undefined;
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal(undefined);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a3'},
        ]);
      });

      it('should get empty array when courseType is null', () => {
        courseType = null;
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal(null);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a3'},
        ]);
      });

      it('should get empty array when courseType is not present', () => {
        courseType = {id: 'a2'};
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(courseType).to.deep.equal({id: 'a2'});
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a1'},
          {courseTypeId: 'a3'},
        ]);
      });
    });

    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getCourseTypeDishes();

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseType).to.deep.equal({id: 'a1'});
      expect(allDishes).to.deep.equal([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a3'},
      ]);
    });

    it('should get filter array when allDishes is array', () => {
      const resultExpected = [
        {courseTypeId: 'a1'},
        {courseTypeId: 'a1'},
      ];

      const result = getCourseTypeDishes(allDishes, courseType);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseType).to.deep.equal({id: 'a1'});
      expect(allDishes).to.deep.equal([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a1'},
        {courseTypeId: 'a3'},
      ]);
    });
  });

  describe('getCurrentCourseTypeDishes', () => {
    let allCourseTypes, allDishes, selectedTab;

    beforeEach(() => {
      allDishes = [
        {courseTypeId: 'a5'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a3'},
      ];
      allCourseTypes = [
        {position: 5, id: 'a8', status: 1},
        {position: 1, id: 'a5', status: 1},
        {position: 15, id: 'a6', status: 1},
        {position: 3, id: 'a87', status: 1},
      ];
      selectedTab = 2;
    });

    describe('allDishes', () => {
      it('should get empty array when allDishes is undefined', () => {
        allDishes = undefined;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal(undefined);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });

      it('should get empty array when allDishes is null', () => {
        allDishes = null;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal(null);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });

      it('should get empty array when allDishes is empty', () => {
        allDishes = [];
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal([]);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });

      it('should get filter array when allDishes is object', () => {
        allDishes = {
          a5: {courseTypeId: 'a5'},
          a1: {courseTypeId: 'a8'},
          a15: {courseTypeId: 'a8'},
          a3: {courseTypeId: 'a3'},
        };
        const resultExpected = [
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
        ];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal({
          a5: {courseTypeId: 'a5'},
          a1: {courseTypeId: 'a8'},
          a15: {courseTypeId: 'a8'},
          a3: {courseTypeId: 'a3'},
        });
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });
    });

    describe('allCourseTypes', () => {
      it('should get empty array when allCourseTypes is undefined', () => {
        allCourseTypes = undefined;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal(undefined);
      });

      it('should get empty array when allCourseTypes is null', () => {
        allCourseTypes = null;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal(null);
      });

      it('should get empty array when allCourseTypes is empty', () => {
        allCourseTypes = [];
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal([]);
      });

      it('should get filter array when allCourseTypes is object', () => {
        allCourseTypes = {
          a5: {position: 5, id: 'a8', status: 1},
          a1: {position: 1, id: 'a5', status: 1},
          a15: {position: 15, id: 'a6', status: 1},
          a3: {position: 3, id: 'a87', status: 1},
        };
        const resultExpected = [
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
        ];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(2);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal({
          a5: {position: 5, id: 'a8', status: 1},
          a1: {position: 1, id: 'a5', status: 1},
          a15: {position: 15, id: 'a6', status: 1},
          a3: {position: 3, id: 'a87', status: 1},
        });
      });
    });

    describe('selectedTab', () => {
      it('should get filter array when selectedTab is undefined', () => {
        selectedTab = undefined;
        const resultExpected = [
          {courseTypeId: 'a5'},
        ];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(undefined);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });

      it('should get empty array when selectedTab is null', () => {
        selectedTab = null;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(null);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });

      it('should get empty array when selectedTab is 4', () => {
        selectedTab = 4;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).to.deep.equal(resultExpected);
        // don't mutate
        expect(selectedTab).to.deep.equal(4);
        expect(allDishes).to.deep.equal([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).to.deep.equal([
          {position: 5, id: 'a8', status: 1},
          {position: 1, id: 'a5', status: 1},
          {position: 15, id: 'a6', status: 1},
          {position: 3, id: 'a87', status: 1},
        ]);
      });
    });

    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getCurrentCourseTypeDishes();

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(selectedTab).to.deep.equal(2);
      expect(allDishes).to.deep.equal([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a3'},
      ]);
      expect(allCourseTypes).to.deep.equal([
        {position: 5, id: 'a8', status: 1},
        {position: 1, id: 'a5', status: 1},
        {position: 15, id: 'a6', status: 1},
        {position: 3, id: 'a87', status: 1},
      ]);
    });

    it('should get filter array when all data correct', () => {
      const resultExpected = [
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
      ];

      const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(selectedTab).to.deep.equal(2);
      expect(allDishes).to.deep.equal([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a3'},
      ]);
      expect(allCourseTypes).to.deep.equal([
        {position: 5, id: 'a8', status: 1},
        {position: 1, id: 'a5', status: 1},
        {position: 15, id: 'a6', status: 1},
        {position: 3, id: 'a87', status: 1},
      ]);
    });
  });

  describe('useMultipleDishes', () => {
    it('should get false when not parameters', () => {
      const resultExpected = false;

      const result = useMultipleDishes();

      expect(result).to.deep.equal(resultExpected);
    });

    it('should get false when courseType is null', () => {
      const courseType = null;
      const resultExpected = false;

      const result = useMultipleDishes(courseType);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseType).to.deep.equal(null);
    });

    it('should get false when name is not Plato Fuerte', () => {
      const courseType = {id: 'test', name: 'test name'};
      const resultExpected = false;

      const result = useMultipleDishes(courseType);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseType).to.deep.equal({id: 'test', name: 'test name'});
    });

    it('should get true when name is Plato Fuerte', () => {
      const courseType = {id: 'test', name: 'Plato Fuerte'};
      const resultExpected = true;

      const result = useMultipleDishes(courseType);

      expect(result).to.deep.equal(resultExpected);
      // don't mutate
      expect(courseType).to.deep.equal({id: 'test', name: 'Plato Fuerte'});
    });
  });
});