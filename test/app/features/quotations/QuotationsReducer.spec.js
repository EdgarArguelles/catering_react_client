/* eslint-disable max-lines */
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'app/features/auth/AuthActions';
import {ACTION_TYPES as DATA_ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES} from 'app/features/quotations/QuotationsActions';
import QuotationsReducer from 'app/features/quotations/QuotationsReducer';

describe('Quotations -> Reducer', () => {
  it('should get default state when empty', () => {
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

    const result = QuotationsReducer();

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

    const result = QuotationsReducer(state, {type: 'invalid'});

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

  it('should reset values when action is LOGOUT', () => {
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

    const result = QuotationsReducer(state, {type: AUTH_ACTION_TYPES.LOGOUT});

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

  it('should reset values when action is QUOTATIONS_DELETE_LOCAL', () => {
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

    const result = QuotationsReducer(state, {type: ACTION_TYPES.QUOTATIONS_DELETE_LOCAL});

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

  describe('isRemoteProcessing', () => {
    it('should change to true when action is CREATE_QUOTATIONS_REQUEST', () => {
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

      const result = QuotationsReducer(state, {type: DATA_ACTION_TYPES.CREATE_QUOTATIONS_REQUEST});

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

    it('should change to true when action is EDIT_QUOTATIONS_REQUEST', () => {
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

      const result = QuotationsReducer(state, {type: DATA_ACTION_TYPES.EDIT_QUOTATIONS_REQUEST});

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

    it('should change to true when action is DELETE_QUOTATIONS_REQUEST', () => {
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

      const result = QuotationsReducer(state, {type: DATA_ACTION_TYPES.DELETE_QUOTATIONS_REQUEST});

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

    it('should change to false when action is QUOTATIONS_END_REMOTE_PROCESS', () => {
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

      const result = QuotationsReducer(state, {type: ACTION_TYPES.QUOTATIONS_END_REMOTE_PROCESS});

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
  });

  describe('selectedTab', () => {
    it('should change selectedTab values when action is QUOTATIONS_CHANGE_MENU_TAB', () => {
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

      const result = QuotationsReducer(state, {type: ACTION_TYPES.QUOTATIONS_CHANGE_MENU_TAB, payload: {tab: 6}});

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
  });

  describe('isMenuDialogOpen', () => {
    it('should change isMenuDialogOpen values when action is QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN', () => {
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

      const result = QuotationsReducer(state, {
        type: ACTION_TYPES.QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN,
        payload: {isMenuDialogOpen: true},
      });

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