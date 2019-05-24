import './AboutItem.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class AboutItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    const {title, iconClass, children} = this.props;

    return (
      <div className="about-item">
        <div className="icon"><i className={iconClass} aria-hidden="true"/></div>
        <h4 className="title">{title}</h4>
        <div className="description">{children}</div>
      </div>
    );
  }
}