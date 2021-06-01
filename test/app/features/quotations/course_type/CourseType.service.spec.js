/* eslint-disable max-lines */
import {
  getCurrentCourseType,
  getSortedCourseTypes,
  useMultipleDishes,
} from 'app/features/quotations/course_type/CourseType.service';

describe('Quotations -> Course Type -> Service', () => {
  describe('getSortedCourseTypes', () => {
    let courseTypes;

    beforeEach(() => {
      courseTypes = [
        { position: 5 },
        { position: 1, status: 0 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
      ];
    });

    describe('courseTypes', () => {
      it('should get empty array when courseTypes is undefined', () => {
        courseTypes = undefined;
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toBeUndefined();
      });

      it('should get empty array when courseTypes is null', () => {
        courseTypes = null;
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual(null);
      });

      it('should get empty array when courseTypes is empty', () => {
        courseTypes = [];
        const resultExpected = [];

        const result = getSortedCourseTypes(courseTypes);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(courseTypes).toStrictEqual([]);
      });
    });

    it('should get empty array when not parameters', () => {
      const resultExpected = [];

      const result = getSortedCourseTypes();

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([
        { position: 5 },
        { position: 1, status: 0 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
      ]);
    });

    it('should get sorted array', () => {
      const resultExpected = [
        { position: 1, status: 0 },
        { position: 3, status: 1 },
        { position: 5 },
        { position: 15, status: 1 },
      ];

      const result = getSortedCourseTypes(courseTypes);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseTypes).toStrictEqual([
        { position: 5 },
        { position: 1, status: 0 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
      ]);
    });
  });

  describe('getCurrentCourseType', () => {
    let allCourseTypes, selectedTab;

    beforeEach(() => {
      allCourseTypes = [
        { position: 5, status: 1 },
        { position: 1, status: 1 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
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
        const resultExpected = { position: 1, status: 1 };

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          { position: 5, status: 1 },
          { position: 1, status: 1 },
          { position: 15, status: 1 },
          { position: 3, status: 1 },
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
          { position: 5, status: 1 },
          { position: 1, status: 1 },
          { position: 15, status: 1 },
          { position: 3, status: 1 },
        ]);
        expect(selectedTab).toStrictEqual(null);
      });

      it('should get third sorted object when selectedTab is 2', () => {
        selectedTab = 2;
        const resultExpected = { position: 5, status: 1 };

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          { position: 5, status: 1 },
          { position: 1, status: 1 },
          { position: 15, status: 1 },
          { position: 3, status: 1 },
        ]);
        expect(selectedTab).toStrictEqual(2);
      });

      it('should get last sorted object when selectedTab is 4', () => {
        selectedTab = 4;
        const resultExpected = { position: 15, status: 1 };

        const result = getCurrentCourseType(allCourseTypes, selectedTab);

        expect(result).toStrictEqual(resultExpected);
        // don't mutate
        expect(allCourseTypes).toStrictEqual([
          { position: 5, status: 1 },
          { position: 1, status: 1 },
          { position: 15, status: 1 },
          { position: 3, status: 1 },
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
        { position: 5, status: 1 },
        { position: 1, status: 1 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
      ]);
      expect(selectedTab).toStrictEqual(1);
    });

    it('should get second sorted object', () => {
      const resultExpected = { position: 3, status: 1 };

      const result = getCurrentCourseType(allCourseTypes, selectedTab);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(allCourseTypes).toStrictEqual([
        { position: 5, status: 1 },
        { position: 1, status: 1 },
        { position: 15, status: 1 },
        { position: 3, status: 1 },
      ]);
      expect(selectedTab).toStrictEqual(1);
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
      const courseType = { id: 'test', name: 'test name' };
      const resultExpected = false;

      const result = useMultipleDishes(courseType);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({ id: 'test', name: 'test name' });
    });

    it('should get true when name is Plato Fuerte', () => {
      const courseType = { id: 'test', name: 'Plato Fuerte' };
      const resultExpected = true;

      const result = useMultipleDishes(courseType);

      expect(result).toStrictEqual(resultExpected);
      // don't mutate
      expect(courseType).toStrictEqual({ id: 'test', name: 'Plato Fuerte' });
    });
  });
});