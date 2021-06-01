import './AboutItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Utils from 'app/common/Utils';

const AboutItem = ({ title, icon, children }) => {
  return (
    <div className="about-item" onMouseEnter={() => Utils.animateIcon(`${title}-icon`)}>
      <div className="icon"><FontAwesomeIcon id={`${title}-icon`} icon={icon}/></div>
      <h4 className="title">{title}</h4>
      <div className="description">{children}</div>
    </div>
  );
};

AboutItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(AboutItem);