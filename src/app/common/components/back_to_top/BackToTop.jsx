import './BackToTop.scss';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import Zoom from '@material-ui/core/Zoom';
import Utils from 'app/common/Utils';

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
      <FontAwesomeIcon id="back-to-top" icon={faChevronUp} onClick={scrollUp}
                       onMouseEnter={() => Utils.animateIcon('back-to-top', {strokeWidth: 40})}/>
    </Zoom>
  );
};

export default React.memo(BackToTop);