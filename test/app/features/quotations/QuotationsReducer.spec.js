/* eslint-disable max-lines */
import {logout} from 'app/features/auth/AuthReducer';
import quotationsReducer, {
  changeMenuDialogOpen,
  changeMenuTab,
  deleteLocal,
} from 'app/features/quotations/QuotationsReducer';

describe('Quotations -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        selectedTab: 0,
        isMenuDialogOpen: false,
        isAuthDialogOpen: false,
        navigation: {
          backLink: '',
          title: '',
          closeDialog: null,
        },
        dish: {
          selected: '',
          showActions: true,
          filter: {
            isDialogOpen: false,
            search: '',
            sort: 'name',
            categories: null,
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: false,
          dishes: [],
        },
        quotation: {
          name: '',
          menus: [],
          price: 0,
        },
      };

      const result = quotationsReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        selectedTab: 5,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      };

      const result = quotationsReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        selectedTab: 5,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      });
    });

    describe('resetData', () => {
      const validateResetData = action => {
        const state = {
          selectedTab: 5,
          isMenuDialogOpen: true,
          isAuthDialogOpen: true,
          navigation: {
            backLink: 'abc',
            title: '123',
            closeDialog: {id: 'ID1'},
          },
          dish: {
            selected: 'test',
            showActions: false,
            filter: {
              isDialogOpen: true,
              search: 'test',
              sort: 'price',
              categories: ['cat1', 'cat2'],
            },
          },
          multipleDishesDialog: {
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
          },
          quotation: {
            id: 'ID1',
            name: 'name 1',
            menus: [{id: 'menu 1'}, {id: 'menu 2'}],
            price: 500.5,
          },
        };

        const stateExpected = {
          selectedTab: 0,
          isMenuDialogOpen: false,
          isAuthDialogOpen: false,
          navigation: {
            backLink: '',
            title: '',
            closeDialog: null,
          },
          dish: {
            selected: '',
            showActions: true,
            filter: {
              isDialogOpen: false,
              search: '',
              sort: 'name',
              categories: null,
            },
          },
          multipleDishesDialog: {
            isMultipleDishesDialogOpen: false,
            dishes: [],
          },
          quotation: {
            name: '',
            menus: [],
            price: 0,
          },
        };

        const result = quotationsReducer(state, action);

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          selectedTab: 5,
          isMenuDialogOpen: true,
          isAuthDialogOpen: true,
          navigation: {
            backLink: 'abc',
            title: '123',
            closeDialog: {id: 'ID1'},
          },
          dish: {
            selected: 'test',
            showActions: false,
            filter: {
              isDialogOpen: true,
              search: 'test',
              sort: 'price',
              categories: ['cat1', 'cat2'],
            },
          },
          multipleDishesDialog: {
            isMultipleDishesDialogOpen: true,
            dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
          },
          quotation: {
            id: 'ID1',
            name: 'name 1',
            menus: [{id: 'menu 1'}, {id: 'menu 2'}],
            price: 500.5,
          },
        });
      };

      it('should reset values when action is logout', () => {
        validateResetData({type: logout.type});
      });

      it('should reset values when action is deleteLocal', () => {
        validateResetData({type: deleteLocal.type});
      });
    });

    it('should change selectedTab values when action is changeMenuTab', () => {
      const state = {
        selectedTab: 5,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      };

      const stateExpected = {
        selectedTab: 6,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      };

      const result = quotationsReducer(state, {type: changeMenuTab.type, payload: 6});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        selectedTab: 5,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      });
    });

    it('should change isMenuDialogOpen values when action is changeMenuDialogOpen', () => {
      const state = {
        selectedTab: 5,
        isMenuDialogOpen: false,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      };

      const stateExpected = {
        selectedTab: 5,
        isMenuDialogOpen: true,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      };

      const result = quotationsReducer(state, {type: changeMenuDialogOpen.type, payload: true});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        selectedTab: 5,
        isMenuDialogOpen: false,
        isAuthDialogOpen: true,
        navigation: {
          backLink: 'abc',
          title: '123',
          closeDialog: {id: 'ID1'},
        },
        dish: {
          selected: 'test',
          showActions: false,
          filter: {
            isDialogOpen: false,
            search: 'test',
            sort: 'price',
            categories: ['cat1', 'cat2'],
          },
        },
        multipleDishesDialog: {
          isMultipleDishesDialogOpen: true,
          dishes: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'}],
        },
        quotation: {
          id: 'ID1',
          name: 'name 1',
          menus: [{id: 'menu 1'}, {id: 'menu 2'}],
          price: 500.5,
        },
      });
    });
  });
});