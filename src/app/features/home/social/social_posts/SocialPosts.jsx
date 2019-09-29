import './SocialPosts.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {EmbeddedPost} from 'react-facebook';
import Slider from 'react-slick';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faPause, faPlay, faTrophy, faUtensils} from '@fortawesome/free-solid-svg-icons';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import FetchButton from 'app/common/components/fetch_button/FetchButton';

const SocialPosts = ({type}) => {
  const [showSlider, setShowSlider] = useState(false);
  const [paused, setPaused] = useState(false);
  const isReview = type === 'review';
  const icon = isReview ? faTrophy : faUtensils;
  const label = isReview
    ? 'Revisa lo que nuestra comunidad piensa de nuestros servicios.'
    : 'Observa ejemplos de nuestros servicios más recientes.';
  const photo1 = 'https://www.facebook.com/cansigno.de.la.torre/posts/673138676487438';
  const photo2 = 'https://www.facebook.com/cansigno.de.la.torre/posts/665773830557256';
  const photo3 = 'https://www.facebook.com/cansigno.de.la.torre/posts/664455697355736';
  const review1 = 'https://www.facebook.com/cansigno.de.la.torre/posts/10219500860331624';
  const review2 = 'https://www.facebook.com/cansigno.de.la.torre/posts/2381837775409677';
  const review3 = 'https://www.facebook.com/cansigno.de.la.torre/posts/10156532633444117';

  let slider;
  const getSlider = () => {
    const togglePause = () => {
      paused && slider.slickPlay();
      !paused && slider.slickPause();
      setPaused(!paused);
    };

    const settings = {
      lazyLoad: true,
      centerMode: true,
      variableWidth: true,
      dots: true,
      autoplay: true,
      arrows: false,
      responsive: [
        {breakpoint: 1920, settings: {centerMode: true, variableWidth: true}},
        {breakpoint: 390, settings: {centerMode: false, variableWidth: false}},
      ],
    };

    return (
      <div className="post-slider">
        <div className="slider-controls">
          <IconButton onClick={() => slider.slickPrev()}><FontAwesomeIcon icon={faChevronLeft}/></IconButton>
          <IconButton onClick={togglePause}><FontAwesomeIcon icon={paused ? faPlay : faPause}/></IconButton>
          <IconButton onClick={() => slider.slickNext()}><FontAwesomeIcon icon={faChevronRight}/></IconButton>
        </div>

        <Slider className="post-carousel" ref={element => (slider = element)} {...settings}>
          <EmbeddedPost href={isReview ? review1 : photo1} showText={isReview}/>
          <EmbeddedPost href={isReview ? review2 : photo2} showText={isReview}/>
          <EmbeddedPost href={isReview ? review3 : photo3} showText={isReview}/>
          <EmbeddedPost href={isReview ? review1 : photo1} showText={isReview}/>
          <EmbeddedPost href={isReview ? review2 : photo2} showText={isReview}/>
          <EmbeddedPost href={isReview ? review3 : photo3} showText={isReview}/>
          <EmbeddedPost href={isReview ? review1 : photo1} showText={isReview}/>
          <EmbeddedPost href={isReview ? review2 : photo2} showText={isReview}/>
          <EmbeddedPost href={isReview ? review3 : photo3} showText={isReview}/>
          <EmbeddedPost href={isReview ? review1 : photo1} showText={isReview}/>
        </Slider>
      </div>
    );
  };

  return (
    <div className="social-posts">
      <p className={showSlider ? 'social-label' : 'social-label-hidden'}>
        <Zoom in={showSlider} timeout={3000}><FontAwesomeIcon icon={icon}/></Zoom>{label}
      </p>
      <FetchButton id={`${type}-button`} color="primary" label="Cargar desde Facebook" hidden={showSlider} icon={icon}
                   asyncCall={async () => await new Promise(resolve => setTimeout(resolve, 3000))}
                   onComplete={() => setShowSlider(true)}/>
      {showSlider && getSlider()}
    </div>
  );
};

SocialPosts.propTypes = {
  type: PropTypes.oneOf(['review', 'photo']).isRequired,
};

export default React.memo(SocialPosts);