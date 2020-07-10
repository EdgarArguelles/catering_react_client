import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const Animate = ({show, className, animationIn, animationOut, onUnmount, children}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const animation = show ? animationIn : animationOut;
  const classes = [];
  animation && classes.push('animate__animated', `animate__${animation}`);
  className && classes.push(className);
  const onAnimationEnd = () => {
    !show && setShouldRender(false);
    onUnmount && onUnmount();
  };

  useEffect(() => {
    show && setShouldRender(true);
  }, [show]);

  if (!shouldRender) {
    return null;
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, {className: classes.join(' '), onAnimationEnd}),
  );
};

Animate.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  animationIn: PropTypes.string.isRequired,
  animationOut: PropTypes.string,
  onUnmount: PropTypes.func,
  children: PropTypes.object.isRequired,
};

export default React.memo(Animate);