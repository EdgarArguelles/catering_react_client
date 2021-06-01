import './PostSlider.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EmbeddedPost } from 'react-facebook';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';

const PostSlider = ({ posts, showText }) => {
  const theme = useSelector(state => state.app.theme);
  const [slider, setSlider] = useState(null);
  const [paused, setPaused] = useState(false);
  const url = 'https://www.facebook.com/cansigno.de.la.torre/posts';

  useEffect(() => {
    const fixSlider = () => {
      slider && slider.slickNext();
      slider && setTimeout(() => slider.slickPrev(), 500);
    };
    window.addEventListener('orientationchange', fixSlider);

    return () => window.removeEventListener('orientationchange', fixSlider);
  }, [slider]);

  const togglePause = () => {
    paused && slider.slickPlay();
    !paused && slider.slickPause();
    setPaused(!paused);
  };

  return (
    <div className="post-slider">
      <div className="slider-controls">
        <IconButton onClick={() => slider.slickPrev()}><FontAwesomeIcon icon={faChevronLeft}/></IconButton>
        <IconButton onClick={togglePause}><FontAwesomeIcon icon={paused ? faPlay : faPause}/></IconButton>
        <IconButton onClick={() => slider.slickNext()}><FontAwesomeIcon icon={faChevronRight}/></IconButton>
      </div>
      <Slider className={`${theme} post-carousel`} ref={element => setSlider(element)} lazyLoad={false}
        centerMode={true} variableWidth={true} adaptiveHeight={true} arrows={false} dots={true} autoplay={true}>
        {posts.map(post => <EmbeddedPost key={post} href={`${url}/${post}`} showText={showText}/>)}
      </Slider>
    </div>
  );
};

PostSlider.propTypes = {
  posts: PropTypes.array.isRequired,
  showText: PropTypes.bool.isRequired,
};

export default React.memo(PostSlider);