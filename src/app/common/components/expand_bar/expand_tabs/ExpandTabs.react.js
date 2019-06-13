import React from 'react';
import PropTypes from 'prop-types';
import {handleScroll, resetAppBarTop} from 'app/common/components/expand_bar/ExpandBar';

export default class ExpandTabs extends React.Component {
  static propTypes = {
    tabsElementId: PropTypes.string.isRequired,
    slideClassName: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {slideClassName} = this.props;
    window.scrollTo(0, 0);
    [].forEach.call(document.getElementsByClassName(slideClassName), element => {
      element.removeEventListener('scroll', this.myHandleScroll);
      element.addEventListener('scroll', this.myHandleScroll);
    });
  }

  componentWillUnmount() {
    const {slideClassName} = this.props;
    [].forEach.call(document.getElementsByClassName(slideClassName), element => {
      element.removeEventListener('scroll', this.myHandleScroll);
    });
    resetAppBarTop();
  }

  myHandleScroll = event => {
    const {tabsElementId, onChange} = this.props;
    handleScroll(tabsElementId, false, onChange)(event);
  };

  render() {
    const {children} = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}