import './BackToTop.scss';
import React, {useEffect, useState} from 'react';
import Zoom from '@material-ui/core/Zoom';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const scrollUp = () => window.scroll({top: 0, left: 0, behavior: 'smooth'});

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 100);
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