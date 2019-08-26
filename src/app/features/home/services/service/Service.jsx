import './Service.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Utils from 'app/common/Utils';

const Service = ({title, icon, children}) => {
  const theme = useSelector(state => state.theme);

  return (
    <div className={`${theme} service`} onMouseEnter={() => Utils.animateIcon(`${title}-icon`)}>
      <div className="icon"><FontAwesomeIcon id={`${title}-icon`} icon={icon}/></div>
      <h4 className="title">{title}</h4>
      <p className="description">{children}</p>
    </div>
  );
};

Service.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
};

export default React.memo(Service);