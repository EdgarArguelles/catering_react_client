import './PostSlider.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {EmbeddedPost} from 'react-facebook';
import Slider from 'react-slick';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import AppActions from 'app/AppActions';

const PostSlider = ({type}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.app.facebookAccessCode);
  const [slider, setSlider] = useState(null);
  const [paused, setPaused] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [posts, setPosts] = useState([]);
  const isReview = type === 'review';
  const photo1 = 'https://www.facebook.com/cansigno.de.la.torre/posts/673138676487438';
  const photo2 = 'https://www.facebook.com/cansigno.de.la.torre/posts/665773830557256';
  const photo3 = 'https://www.facebook.com/cansigno.de.la.torre/posts/664455697355736';
  const review1 = 'https://www.facebook.com/cansigno.de.la.torre/posts/10219500860331624';
  const review2 = 'https://www.facebook.com/cansigno.de.la.torre/posts/2381837775409677';
  const review3 = 'https://www.facebook.com/cansigno.de.la.torre/posts/10156532633444117';

  useEffect(() => {
    const loadPosts = async () => {
      if (!token) {
        dispatch(AppActions.getFacebookAccessCode());
        return;
      }

      setWaiting(true);
      const endpoint = isReview ? 'ratings?fields=recommendation_type%2Copen_graph_story' : 'photos?type=uploaded';
      const url = `https://graph.facebook.com/v4.0/615026265632013/${endpoint}&limit=10&access_token=${token}`;
      const response = await fetch(url);
      const payload = await response.json();

      if (payload.error) {
        await dispatch(AppActions.getFacebookAccessCode());
        setWaiting(false);
      } else {
        const array = isReview ?
          payload.data.filter(p => p.recommendation_type === 'positive').map(p => p.open_graph_story.id) :
          payload.data.map(post => post.id);
        setPosts(array);
      }
    };

    !waiting && loadPosts();
  }, [dispatch, waiting, isReview, token]);

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

      <Slider className="post-carousel" ref={element => setSlider(element)} lazyLoad={false} centerMode={true}
              variableWidth={true} adaptiveHeight={true} arrows={false} dots={true} autoplay={true}>
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

PostSlider.propTypes = {
  type: PropTypes.oneOf(['review', 'photo']).isRequired,
};

export default React.memo(PostSlider);