import './Image.scss';
import error from 'assets/img/not-found.png';
import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    smallLoading: PropTypes.bool,
  };

  render() {
    const {className, smallLoading, ...props} = this.props;

    return (
      <img ref={img => (this.img = img)} onError={() => (this.img.src = error)}
           className={`${smallLoading ? 'loading-small' : 'loading-image'} ${className}`} {...props}/>
    );
  }
}