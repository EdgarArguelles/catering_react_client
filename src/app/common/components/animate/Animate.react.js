import React from 'react';
import PropTypes from 'prop-types';

export default class Animate extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    className: PropTypes.string,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    delayOut: PropTypes.number,
    children: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {removedFromDOM: false};
    this.timeout = {};
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  toggleRemove = (delay = 0) => {
    const {visible} = this.props;
    const time = visible ? 0 : delay;

    // when component is visible, toggleRemove should move removedFromDOM to false after 0 delay
    // when component isn't visible, toggleRemove should move removedFromDOM to true after a delay
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({removedFromDOM: !visible}), time);
  };

  render() {
    const {visible, className, animationIn, animationOut, delayOut, children} = this.props;
    const animation = visible ? animationIn : animationOut;
    const classes = [];
    animation && classes.push('animated', animation);
    className && classes.push(className);

    // don't call toggleRemove if isn't needed, toggleRemove moves removedFromDOM to false only when visible is true
    if ((this.state.removedFromDOM && visible) || (!this.state.removedFromDOM && !visible)) {
      this.toggleRemove(delayOut);
    }

    if (this.state.removedFromDOM && !visible) {
      return null;
    }

    return React.Children.map(children, child =>
      React.cloneElement(child, {className: classes.join(' ')}),
    );
  }
}