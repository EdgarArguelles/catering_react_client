import './Service.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Service = ({title, iconClass, children}) => {
  return (
    <div className="service">
      <div className="icon"><i className={iconClass} aria-hidden="true"/></div>
      <h4 className="title">{title}</h4>
      <p className="description">{children}</p>
    </div>
  );
};

Service.propTypes = {
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(Service);