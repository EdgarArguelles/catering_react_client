import './BackToTop.scss';
import jQuery from 'jquery';
import React, {useEffect, useState} from 'react';
import Zoom from '@material-ui/core/Zoom';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const handleScroll = () => setVisible(window.pageYOffset > 100);
  const scrollUp = () => jQuery('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Zoom in={visible}>
      <i id="back-to-top" className="fas fa-chevron-up" aria-hidden="true" onClick={scrollUp}/>
    </Zoom>
  );
};

export default BackToTop;