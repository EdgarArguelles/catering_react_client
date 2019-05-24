import './SectionHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class SectionHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    const {title, children} = this.props;

    return (
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{children}</p>
      </div>
    );
  }
}