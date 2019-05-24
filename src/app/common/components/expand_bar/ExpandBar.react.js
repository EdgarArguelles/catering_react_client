import React from 'react';
import PropTypes from 'prop-types';

const APP_BAR_ID = 'app-bar';
const NAVIGATION_ID = 'navigation';
let lastScrollTop = 0;
let toCollapseHeight;

const updateTop = (element, change, minTop, maxTop, alwaysVisible, shouldMoveNavigation) => {
  let oldTop = element.style.top;
  oldTop = oldTop ? parseFloat(oldTop.replace('px', '')) : maxTop;

  let newTop = oldTop + change;
  newTop = newTop < minTop ? minTop : newTop;
  newTop = newTop > maxTop ? maxTop : newTop;

  if (oldTop !== newTop) {
    element.style.top = `${newTop}px`;
    alwaysVisible.style.top = `${newTop + toCollapseHeight}px`;
    const nav = document.getElementById(NAVIGATION_ID);
    shouldMoveNavigation && nav && (nav.style.marginTop = `${newTop * -2}px`);
  }
};

export const handleScroll = (elementIdAlwaysVisible, shouldMoveNavigation, onChange,
                             elementIdToCollapse = APP_BAR_ID) => event => {
  const toCollapse = document.getElementById(elementIdToCollapse);
  const alwaysVisible = document.getElementById(elementIdAlwaysVisible);
  toCollapseHeight = toCollapse.offsetHeight;

  const scrollTop = event.target.scrollTop !== undefined ? event.target.scrollTop : window.pageYOffset;
  updateTop(toCollapse, lastScrollTop - scrollTop, -toCollapseHeight, 0, alwaysVisible, shouldMoveNavigation);
  lastScrollTop = scrollTop;

  if (onChange) {
    onChange(parseInt(alwaysVisible.style.top.replace('px', ''), 10),
      parseInt(toCollapse.style.top.replace('px', ''), 10));
  }
};

export const resetAppBarTop = (elementIdToCollapse = APP_BAR_ID) => {
  document.getElementById(elementIdToCollapse).style.top = '0';
  document.getElementById(NAVIGATION_ID) && (document.getElementById(NAVIGATION_ID).style.marginTop = '0');
};

export const resetBarsTop = (elementIdAlwaysVisible, elementIdToCollapse = APP_BAR_ID) => {
  document.getElementById(elementIdAlwaysVisible).style.top = `${toCollapseHeight}px`;
  resetAppBarTop(elementIdToCollapse);
};

export default class ExpandBar extends React.Component {
  static propTypes = {
    shouldMoveNavigation: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.myHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.myHandleScroll);
    resetAppBarTop();
  }

  myHandleScroll = event => {
    const {shouldMoveNavigation, onChange} = this.props;
    handleScroll('expand-bar', shouldMoveNavigation, onChange)(event);
  };

  render() {
    const {children} = this.props;

    return <div id="expand-bar">{children}</div>;
  }
}