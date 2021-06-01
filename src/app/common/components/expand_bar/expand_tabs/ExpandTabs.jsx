import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { handleScroll, resetAppBarTop } from 'app/common/components/expand_bar/ExpandBar';

const ExpandTabs = ({ tabsElementId, slideClassName, onChange, children }) => {
  const latestOnChange = useRef(onChange); // avoid to re-run useEffect when onChange changes

  useEffect(() => {
    const myHandleScroll = event => handleScroll(tabsElementId, false, latestOnChange.current)(event);
    window.scrollTo(0, 0);
    [].forEach.call(document.getElementsByClassName(slideClassName), element => {
      element.removeEventListener('scroll', myHandleScroll);
      element.addEventListener('scroll', myHandleScroll);
    });

    return () => {
      [].forEach.call(document.getElementsByClassName(slideClassName), element => {
        element.removeEventListener('scroll', myHandleScroll);
      });
      resetAppBarTop();
    };
  }, [tabsElementId, slideClassName]);

  return <>{children}</>;
};

ExpandTabs.propTypes = {
  tabsElementId: PropTypes.string.isRequired,
  slideClassName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.object.isRequired,
};

export default React.memo(ExpandTabs);