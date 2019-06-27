import './AboutItem.scss';
import React from 'react';
import PropTypes from 'prop-types';

const AboutItem = ({title, iconClass, children}) => {
  return (
    <div className="about-item">
      <div className="icon"><i className={iconClass} aria-hidden="true"/></div>
      <h4 className="title">{title}</h4>
      <div className="description">{children}</div>
    </div>
  );
};

AboutItem.propTypes = {
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(AboutItem);