/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import React from 'react';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField.react';

describe('Components -> EnterTextField', () => {
  const onSaveStub = sinon.stub();
  let component, wrapper;

  afterEach(() => {
    onSaveStub.reset();
  });

  const mountComponent = props => {
    wrapper = renderer.create(<EnterTextField {...props}/>);
    component = wrapper.root.find(el => el.type.name === 'EnterTextField');
  };

  describe('load', () => {
    it('should have required props', () => {
      mountComponent({
        onSave: onSaveStub,
      });

      expect(component.props.autoFocus).toBeUndefined();
      expect(component.props.placeholder).toBeUndefined();
      expect(component.props.className).toBeUndefined();
      expect(component.props.initValue).toBeUndefined();
      expect(component.props.onSave).toStrictEqual(onSaveStub);
    });

    it('should have all props', () => {
      mountComponent({
        autoFocus: true,
        placeholder: 'placeholder test',
        className: 'className test',
        initValue: 'initValue test',
        onSave: onSaveStub,
      });

      expect(component.props.autoFocus).toStrictEqual(true);
      expect(component.props.placeholder).toStrictEqual('placeholder test');
      expect(component.props.className).toStrictEqual('className test');
      expect(component.props.initValue).toStrictEqual('initValue test');
      expect(component.props.onSave).toStrictEqual(onSaveStub);
    });
  });

  describe('handleSave', () => {
    it('should call onSave', () => {
      mountComponent({onSave: onSaveStub});

      wrapper.root.findByType('input').props.onBlur({target: {value: 'test'}});

      sinon.assert.callCount(onSaveStub, 1);
      sinon.assert.calledWithExactly(onSaveStub, 'test');
    });
  });

  describe('handleKeyUp', () => {
    it('should call onSave when keyCode is 13', () => {
      mountComponent({onSave: onSaveStub});

      wrapper.root.findByType('div').props.onKeyUp({keyCode: 13, target: {value: 'test'}});

      sinon.assert.callCount(onSaveStub, 1);
      sinon.assert.calledWithExactly(onSaveStub, 'test');
    });

    it('should call onSave when keyCode is 27 and initValue is present', () => {
      mountComponent({initValue: 'initValue test', onSave: onSaveStub});

      wrapper.root.findByType('div').props.onKeyUp({keyCode: 27});

      sinon.assert.callCount(onSaveStub, 1);
      sinon.assert.calledWithExactly(onSaveStub, 'initValue test');
    });

    it('should call onSave when keyCode is 27 and initValue is not present', () => {
      mountComponent({onSave: onSaveStub});

      wrapper.root.findByType('div').props.onKeyUp({keyCode: 27});

      sinon.assert.callCount(onSaveStub, 1);
      sinon.assert.calledWithExactly(onSaveStub, '');
    });

    it('should not call onSave when keyCode is not 13 or 27', () => {
      mountComponent({onSave: onSaveStub});

      wrapper.root.findByType('div').props.onKeyUp({keyCode: 30});

      sinon.assert.callCount(onSaveStub, 0);
    });
  });

  describe('snapshot', () => {
    it('should render TextField without props', () => {
      mountComponent({onSave: onSaveStub});

      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should render TextField with props', () => {
      mountComponent({
        autoFocus: true,
        placeholder: 'placeholder test',
        className: 'className test',
        initValue: 'initValue test',
        onSave: onSaveStub,
      });

      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});