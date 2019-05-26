import {expect} from 'chai';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import pingServer from 'app/features/PingServer';
import AuthActions from 'app/features/auth/AuthActions';
import Header from 'app/features/home/header/Header.react';

describe('PingServer', () => {
  const PingHeader = pingServer(Header);
  const dispatchStub = sinon.stub();
  const fetchPingStub = sinon.stub(AuthActions, 'fetchPing');
  let component, store, wrapper;

  afterEach(() => {
    dispatchStub.reset();
    fetchPingStub.reset();
  });

  const getProvider = children => {
    return <Provider store={store}>{children}</Provider>;
  };

  const mountComponent = () => {
    store = configureStore()({});
    store.dispatch = dispatchStub;
    wrapper = renderer.create(getProvider(<PingHeader/>));
    component = wrapper.root.find(el => el.type.name === 'PingServer');
  };

  describe('load', () => {
    it('should have all props', () => {
      mountComponent();

      expect(component.props.ping).to.not.be.undefined;
    });
  });

  describe('componentWillMount', () => {
    it('should call fetchPing', () => {
      fetchPingStub.withArgs().returns('response');
      mountComponent();

      sinon.assert.callCount(fetchPingStub, 1);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, 'response');
    });
  });

  describe('componentWillUpdate', () => {
    it('should call fetchPing', () => {
      fetchPingStub.withArgs().returns('response');
      mountComponent();
      wrapper.update(getProvider(<PingHeader test={true}/>));

      sinon.assert.callCount(fetchPingStub, 2);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, 'response');
      sinon.assert.calledWithExactly(dispatchStub, 'response');
    });
  });

  describe('snapshot', () => {
    it('should render header', () => {
      mountComponent();

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});