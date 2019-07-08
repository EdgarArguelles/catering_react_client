import './SectionHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({title, children}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{children}</p>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(SectionHeader);