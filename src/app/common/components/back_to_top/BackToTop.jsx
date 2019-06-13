import './BackToTop.scss';
import jQuery from 'jquery';
import React, {useEffect} from 'react';

const BackToTop = () => {
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      jQuery('#back-to-top').fadeIn('slow');
    } else {
      jQuery('#back-to-top').fadeOut('slow');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    jQuery('#back-to-top').click(() => jQuery('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo'));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <i id="back-to-top" className="fas fa-chevron-up" aria-hidden="true"/>;
};

export default BackToTop;