import './Service.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class Service extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    const {title, iconClass, children} = this.props;

    return (
      <div className="service">
        <div className="icon"><i className={iconClass} aria-hidden="true"/></div>
        <h4 className="title">{title}</h4>
        <p className="description">{children}</p>
      </div>
    );
  }
}