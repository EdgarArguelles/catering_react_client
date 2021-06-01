import './Image.scss';
import error from 'assets/img/not-found.png';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className, smallLoading, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img src={imgSrc} alt={alt} onError={() => setImgSrc(error)}
      className={`${smallLoading ? 'loading-small' : 'loading-image'} ${className}`} {...props}/>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  smallLoading: PropTypes.bool,
};

export default React.memo(Image);