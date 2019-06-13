/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import reducers from 'app/Reducers';
import DishesLoader from 'app/data/dishes/DishesLoader.react';
import DishesActions, {ACTION_TYPES} from 'app/data/dishes/DishesActions';
import {ACTION_TYPES as DATA_TYPES} from 'app/data/DataActions';

describe('Data -> Dishes -> Loader', () => {
  const myRenderer = () => <div>renderer</div>;
  const dispatchStub = sinon.stub();
  const fetchDishStub = sinon.stub(DishesActions, 'fetchDish');
  let component, store, wrapper;

  afterEach(() => {
    dispatchStub.reset();
    fetchDishStub.reset();
  });

  const mountComponent = (state, props, children, useRealStore) => {
    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    wrapper = renderer.create(<Provider store={store}>
      <DishesLoader {...props}>{children}</DishesLoader>
    </Provider>);
    component = wrapper.root.find(el => el.type.name === 'DishesLoader');
  };

  describe('load', () => {
    it('should have required props', () => {
      mountComponent(
        {
          data: {
            fetching: {dish: {}},
          },
        },
        {
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}],
        },
      );

      expect(component.props.children).toBeUndefined();
      expect(component.props.renderer).toBeUndefined();
      expect(component.props.loader).toBeUndefined();
      expect(component.props.dishes).toStrictEqual([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}]);
      expect(component.props.dataVersion).toBeUndefined();
      expect(component.props.dishFetching).toStrictEqual({});
      expect(component.props.allDishes).toBeUndefined();
      expect(component.props.fetchDish).toBeDefined();
    });

    it('should have all props', () => {
      mountComponent(
        {
          data: {
            version: 5,
            fetching: {dish: {D1: false, D2: true}},
            dishes: {D1: {id: 'D1'}, D2: {id: 'D2'}, D3: {id: 'D3'}},
          },
        },
        {
          renderer: myRenderer,
          loader: <div>loader</div>,
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
        <h1>Test</h1>,
      );

      expect(component.props.children).toStrictEqual(<h1>Test</h1>);
      expect(component.props.renderer).toStrictEqual(myRenderer);
      expect(component.props.loader).toStrictEqual(<div>loader</div>);
      expect(component.props.dishes).toStrictEqual([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}]);
      expect(component.props.dataVersion).toStrictEqual(5);
      expect(component.props.dishFetching).toStrictEqual({D1: false, D2: true});
      expect(component.props.allDishes).toStrictEqual({D1: {id: 'D1'}, D2: {id: 'D2'}, D3: {id: 'D3'}});
      expect(component.props.fetchDish).toBeDefined();
    });
  });

  describe('componentWillMount', () => {
    it('should not call fetchDish', () => {
      mountComponent(
        {
          data: {
            version: 5,
            fetching: {dish: {D1: true}},
            dishes: {D2: {id: 'D2'}, D3: {id: 'D3'}, D4: {id: 'D4'}},
          },
        },
        {
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
      );

      sinon.assert.callCount(fetchDishStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call fetchDish', () => {
      fetchDishStub.withArgs('D1').returns('response1');
      fetchDishStub.withArgs('D4').returns('response2');
      mountComponent(
        {
          data: {
            version: 5,
            fetching: {dish: {D1: false, D2: true}},
            dishes: {D3: {id: 'D3'}},
          },
        },
        {
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
      );

      sinon.assert.callCount(fetchDishStub, 2);
      sinon.assert.calledWithExactly(fetchDishStub, 'D1');
      sinon.assert.calledWithExactly(fetchDishStub, 'D4');
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, 'response1');
      sinon.assert.calledWithExactly(dispatchStub, 'response2');
    });

    it('should call fetchDish when allDishes is empty', () => {
      fetchDishStub.withArgs('D1').returns('response1');
      fetchDishStub.withArgs('D2').returns('response2');
      fetchDishStub.withArgs('D4').returns('response3');
      mountComponent(
        {
          data: {
            version: 5,
            fetching: {dish: {D1: false, D3: true}},
          },
        },
        {
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
      );

      sinon.assert.callCount(fetchDishStub, 3);
      sinon.assert.calledWithExactly(fetchDishStub, 'D1');
      sinon.assert.calledWithExactly(fetchDishStub, 'D2');
      sinon.assert.calledWithExactly(fetchDishStub, 'D4');
      sinon.assert.callCount(dispatchStub, 3);
      sinon.assert.calledWithExactly(dispatchStub, 'response1');
      sinon.assert.calledWithExactly(dispatchStub, 'response2');
      sinon.assert.calledWithExactly(dispatchStub, 'response3');
    });
  });

  describe('componentWillUpdate', () => {
    beforeEach(() => {
      fetchDishStub.withArgs('D1').returns({type: 'TEST'});
      fetchDishStub.withArgs('D2').returns({type: 'TEST'});
      fetchDishStub.withArgs('D3').returns({type: 'TEST'});
      fetchDishStub.withArgs('D4').returns({type: 'TEST'});
      mountComponent(
        {
          data: {
            version: 5,
            fetching: {dish: {D1: true}},
            dishes: {D2: {id: 'D2'}, D3: {id: 'D3'}, D4: {id: 'D4'}},
          },
        },
        {
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
        null, true,
      );
    });

    it('should not call fetchDish', () => {
      sinon.assert.callCount(fetchDishStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should not call fetchDish when dispatch FETCH_DISH_ERROR', () => {
      act(() => {
        store.dispatch({type: ACTION_TYPES.FETCH_DISH_ERROR, payload: {dishId: 'D1'}});
      });

      sinon.assert.callCount(fetchDishStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call fetchDish', () => {
      act(() => {
        store.dispatch({type: ACTION_TYPES.FETCH_DISH_ERROR, payload: {dishId: 'D1'}});
        store.dispatch({
          type: DATA_TYPES.DATA_CHANGE_VERSION,
          payload: {
            version: 6,
          },
        });
      });

      sinon.assert.callCount(fetchDishStub, 4);
      sinon.assert.calledWithExactly(fetchDishStub, 'D1');
      sinon.assert.calledWithExactly(fetchDishStub, 'D2');
      sinon.assert.calledWithExactly(fetchDishStub, 'D3');
      sinon.assert.calledWithExactly(fetchDishStub, 'D4');
      sinon.assert.callCount(dispatchStub, 0);
    });
  });

  describe('snapshot', () => {
    it('should render renderer', () => {
      mountComponent(
        {
          data: {
            fetching: {dish: {}},
            dishes: {D1: {id: 'D1'}, D2: {id: 'D2'}, D3: {id: 'D3'}},
          },
        },
        {
          renderer: myRenderer,
          loader: <div>loader</div>,
          dishes: [{id: 'D1'}, {id: 'D2'}],
        },
        <h1>Test</h1>,
      );

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should render h1 Test', () => {
      mountComponent(
        {
          data: {
            fetching: {dish: {}},
            dishes: {},
          },
        },
        {
          loader: <div>loader</div>,
          dishes: [],
        },
        <h1>Test</h1>,
      );

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should render loader', () => {
      mountComponent(
        {
          data: {
            fetching: {dish: {}},
            dishes: {D1: {id: 'D1'}},
          },
        },
        {
          renderer: myRenderer,
          loader: <div>loader</div>,
          dishes: [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}],
        },
        <h1>Test</h1>,
      );

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should render null', () => {
      mountComponent(
        {
          data: {
            fetching: {dish: {}},
          },
        },
        {
          renderer: myRenderer,
          dishes: [{id: 'D1'}],
        },
        <h1>Test</h1>,
      );

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});