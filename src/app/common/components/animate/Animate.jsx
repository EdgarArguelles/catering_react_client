import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const Animate = ({visible, className, animationIn, animationOut, delayOut, children}) => {
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []); // Clean timeout on Unmount

  const [removedFromDOM, setRemovedFromDOM] = useState(false);
  const animation = visible ? animationIn : animationOut;
  const classes = [];
  animation && classes.push('animated', animation);
  className && classes.push(className);

  const toggleRemove = (delay = 0) => {
    const time = visible ? 0 : delay;

    // when component is visible, toggleRemove should move removedFromDOM to false after 0 delay
    // when component isn't visible, toggleRemove should move removedFromDOM to true after a delay
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setRemovedFromDOM(!visible), time);
  };

  // don't call toggleRemove if isn't needed, toggleRemove moves removedFromDOM to false only when visible is true
  if ((removedFromDOM && visible) || (!removedFromDOM && !visible)) {
    toggleRemove(delayOut);
  }

  if (removedFromDOM && !visible) {
    return null;
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, {className: classes.join(' ')}),
  );
};

Animate.propTypes = {
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  delayOut: PropTypes.number,
  children: PropTypes.object.isRequired,
};

export default React.memo(Animate);