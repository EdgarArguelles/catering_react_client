import './Image.scss';
import error from 'assets/img/not-found.png';
import React from 'react';
import PropTypes from 'prop-types';

const Image = ({className, smallLoading, ...props}) => {
  return (
    <img ref={img => (this.img = img)} onError={() => (this.img.src = error)}
         className={`${smallLoading ? 'loading-small' : 'loading-image'} ${className}`} {...props}/>
  );
};

Image.propTypes = {
  className: PropTypes.string,
  smallLoading: PropTypes.bool,
};

export default React.memo(Image);