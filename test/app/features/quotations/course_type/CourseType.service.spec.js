/* eslint-disable max-lines */
import {
  getActiveCourseTypes,
  getCourseTypeDishes,
  getCurrentCourseType,
  getCurrentCourseTypeDishes,
  getSortedCourseTypes,
  useMultipleDishes,
} from 'app/features/quotations/course_type/CourseType.service';

describe('Quotations -> Course Type -> Service', () => {
  describe('getActiveCourseTypes', () => {
    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getActiveCourseTypes();

      expect(result).toStrictEqual(resultExpected);
    });

    it('should get empty array when courseTypes is null', () => {
      const courseTypes = null;
      const resultExpected = [];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual(null);
    });

    it('should get empty array when courseTypes is empty', () => {
      const courseTypes = [];
      const resultExpected = [];

      const result = getActiveCourseTypes(courseTypes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([]);
    });

    it('should exclude inactive', () => {
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toBeUndefined();
        expect(shouldIncludeInactive).toStrictEqual(true);
      });

      it('should get empty array when courseTypes is null', () => {
        courseTypes = null;
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual(null);
        expect(shouldIncludeInactive).toStrictEqual(true);
      });

      it('should get empty array when courseTypes is empty', () => {
        courseTypes = [];
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual([]);
        expect(shouldIncludeInactive).toStrictEqual(true);
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).toBeUndefined();
      });

      it('should get sorted array when shouldIncludeInactive is null', () => {
        shouldIncludeInactive = null;
        const resultExpected = [
          {position: 3, status: 1},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).toStrictEqual(null);
      });

      it('should get sorted array when shouldIncludeInactive is false', () => {
        shouldIncludeInactive = false;
        const resultExpected = [
          {position: 3, status: 1},
          {position: 15, status: 1},
        ];

        const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual([
          {position: 5},
          {position: 1, status: 0},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(shouldIncludeInactive).toStrictEqual(false);
      });
    });

    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getSortedCourseTypes();

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(shouldIncludeInactive).toStrictEqual(true);
    });

    it('should get sorted array when courseTypes is array', () => {
      const resultExpected = [
        {position: 1, status: 0},
        {position: 3, status: 1},
        {position: 5},
        {position: 15, status: 1},
      ];

      const result = getSortedCourseTypes(courseTypes, shouldIncludeInactive);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([
        {position: 5},
        {position: 1, status: 0},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(shouldIncludeInactive).toStrictEqual(true);
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toBeUndefined();
        expect(selectedTab).toStrictEqual(1);
      });

      it('should get undefined when allCourseTypes is null', () => {
        allCourseTypes = null;
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual(null);
        expect(selectedTab).toStrictEqual(1);
      });

      it('should get undefined when allCourseTypes is empty', () => {
        allCourseTypes = [];
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([]);
        expect(selectedTab).toStrictEqual(1);
      });
    });

    describe('selectedTab', () => {
      it('should get first sorted object when selectedTab is undefined', () => {
        selectedTab = undefined;
        const resultExpected = {position: 1, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).toBeUndefined();
      });

      it('should get undefined when selectedTab is null', () => {
        selectedTab = null;
        const resultExpected = undefined;

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).toStrictEqual(null);
      });

      it('should get third sorted object when selectedTab is 2', () => {
        selectedTab = 2;
        const resultExpected = {position: 5, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).toStrictEqual(2);
      });

      it('should get last sorted object when selectedTab is 4', () => {
        selectedTab = 4;
        const resultExpected = {position: 15, status: 1};

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          {position: 5, status: 1},
          {position: 1, status: 1},
          {position: 15, status: 1},
          {position: 3, status: 1},
        ]);
        expect(selectedTab).toStrictEqual(4);
      });
    });

    it('should get undefined when not parameters', () => {
      const resultExpected = undefined;

      const result = getCurrentCourseType();

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(allCourseTypes).toStrictEqual([
        {position: 5, status: 1},
        {position: 1, status: 1},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(selectedTab).toStrictEqual(1);
    });

    it('should get second sorted object', () => {
      const resultExpected = {position: 3, status: 1};

      const result = getCurrentCourseType(allCourseTypes, selectedTab);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(allCourseTypes).toStrictEqual([
        {position: 5, status: 1},
        {position: 1, status: 1},
        {position: 15, status: 1},
        {position: 3, status: 1},
      ]);
      expect(selectedTab).toStrictEqual(1);
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual({id: 'a1'});
        expect(allDishes).toBeUndefined();
      });

      it('should get empty array when allDishes is null', () => {
        allDishes = null;
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual({id: 'a1'});
        expect(allDishes).toStrictEqual(null);
      });

      it('should get empty array when allDishes is empty', () => {
        allDishes = [];
        const resultExpected = [];

        const result = getCourseTypeDishes(allDishes, courseType);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual({id: 'a1'});
        expect(allDishes).toStrictEqual([]);
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual({id: 'a1'});
        expect(allDishes).toStrictEqual({
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toBeUndefined();
        expect(allDishes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual(null);
        expect(allDishes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseType).toStrictEqual({id: 'a2'});
        expect(allDishes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({id: 'a1'});
      expect(allDishes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({id: 'a1'});
      expect(allDishes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toBeUndefined();
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual(null);
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual([]);
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual({
          a5: {courseTypeId: 'a5'},
          a1: {courseTypeId: 'a8'},
          a15: {courseTypeId: 'a8'},
          a3: {courseTypeId: 'a3'},
        });
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toBeUndefined();
      });

      it('should get empty array when allCourseTypes is null', () => {
        allCourseTypes = null;
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toStrictEqual(null);
      });

      it('should get empty array when allCourseTypes is empty', () => {
        allCourseTypes = [];
        const resultExpected = [];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(2);
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toStrictEqual([]);
      });
    });

    describe('selectedTab', () => {
      it('should get filter array when selectedTab is undefined', () => {
        selectedTab = undefined;
        const resultExpected = [
          {courseTypeId: 'a5'},
        ];

        const result = getCurrentCourseTypeDishes(allDishes, allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toBeUndefined();
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(null);
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toStrictEqual([
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

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(selectedTab).toStrictEqual(4);
        expect(allDishes).toStrictEqual([
          {courseTypeId: 'a5'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a8'},
          {courseTypeId: 'a3'},
        ]);
        expect(allCourseTypes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(selectedTab).toStrictEqual(2);
      expect(allDishes).toStrictEqual([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a3'},
      ]);
      expect(allCourseTypes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(selectedTab).toStrictEqual(2);
      expect(allDishes).toStrictEqual([
        {courseTypeId: 'a5'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a8'},
        {courseTypeId: 'a3'},
      ]);
      expect(allCourseTypes).toStrictEqual([
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

      expect(result).toStrictEqual(resultExpected);
    });

    it('should get false when courseType is null', () => {
      const courseType = null;
      const resultExpected = false;

      const result = useMultipleDishes(courseType);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual(null);
    });

    it('should get false when name is not Plato Fuerte', () => {
      const courseType = {id: 'test', name: 'test name'};
      const resultExpected = false;

      const result = useMultipleDishes(courseType);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({id: 'test', name: 'test name'});
    });

    it('should get true when name is Plato Fuerte', () => {
      const courseType = {id: 'test', name: 'Plato Fuerte'};
      const resultExpected = true;

      const result = useMultipleDishes(courseType);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({id: 'test', name: 'Plato Fuerte'});
    });
  });
});