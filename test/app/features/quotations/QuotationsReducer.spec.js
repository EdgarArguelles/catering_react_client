/* eslint-disable max-lines */
import {logout} from 'app/features/auth/AuthReducer';
import {createQuotation, deleteQuotation, editQuotation} from 'app/data/quotations/QuotationsReducer';
import quotationsReducer, {
  changeMenuDialogOpen,
  changeMenuTab,
  deleteLocal,
  endRemoteProcess,
} from 'app/features/quotations/QuotationsReducer';

describe('Quotations -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        isRemoteProcessing: false,
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
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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

    it('should reset values when action is logout', () => {
      const state = {
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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

      const result = quotationsReducer(state, {type: logout.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
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

    it('should reset values when action is deleteLocal', () => {
      const state = {
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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

      const result = quotationsReducer(state, {type: deleteLocal.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
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

    it('should change isRemoteProcessing to true when action is createQuotation.pending', () => {
      const state = {
        isRemoteProcessing: false,
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
        isRemoteProcessing: true,
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

      const result = quotationsReducer(state, {type: createQuotation.pending.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: false,
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

    it('should change isRemoteProcessing to true when action is editQuotation.pending', () => {
      const state = {
        isRemoteProcessing: false,
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
        isRemoteProcessing: true,
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

      const result = quotationsReducer(state, {type: editQuotation.pending.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: false,
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

    it('should change isRemoteProcessing to true when action is deleteQuotation.pending', () => {
      const state = {
        isRemoteProcessing: false,
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
        isRemoteProcessing: true,
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

      const result = quotationsReducer(state, {type: deleteQuotation.pending.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: false,
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

    it('should change isRemoteProcessing to false when action is endRemoteProcess', () => {
      const state = {
        isRemoteProcessing: true,
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
        isRemoteProcessing: false,
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

      const result = quotationsReducer(state, {type: endRemoteProcess.type});

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
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

    it('should change selectedTab values when action is changeMenuTab', () => {
      const state = {
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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
        isRemoteProcessing: true,
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