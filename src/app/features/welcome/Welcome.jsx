import './Welcome.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';
import {useIsMobileSize} from 'app/common/Hooks';

const Welcome = ({open, onClose}) => {
  const isMobileSize = useIsMobileSize();
  const [landscape, setLandscape] = useState(false);
  useEffect(() => {
    const setScreenOrientation = () => setLandscape(window.matchMedia('(orientation: portrait)').matches);
    window.addEventListener('orientationchange', setScreenOrientation);

    return () => window.removeEventListener('orientationchange', setScreenOrientation);
  }, []);

  return (
    <AutoRotatingCarousel label="Completar" open={open} autoplay={true} mobile={isMobileSize} landscape={landscape}
                          onStart={onClose}>
      <Slide media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png"/>}
             mediaBackgroundStyle={{backgroundColor: 'red'}}
             style={{backgroundColor: 'red'}}
             title="This is a very cool feature"
             subtitle="Just using this will blow your mind."/>
      <Slide media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png"/>}
             mediaBackgroundStyle={{backgroundColor: 'blue'}}
             style={{backgroundColor: 'blue'}}
             title="Ever wanted to be popular?"
             subtitle="Well just mix two colors and your are good to go!"/>
      <Slide media={<img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png"/>}
             mediaBackgroundStyle={{backgroundColor: 'green'}}
             style={{backgroundColor: 'green'}}
             title="May the force be with you"
             subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."/>
    </AutoRotatingCarousel>
  );
};

Welcome.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Welcome);