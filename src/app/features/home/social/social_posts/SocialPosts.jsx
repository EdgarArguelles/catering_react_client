import './SocialPosts.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy, faUtensils} from '@fortawesome/free-solid-svg-icons';
import Zoom from '@material-ui/core/Zoom';
import FetchButton from 'app/common/components/fetch_button/FetchButton';
import PostSlider from './post_slider/PostSlider';
import {getFacebookAccessCode} from 'app/AppReducer';

const SocialPosts = ({type}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.app.facebookAccessCode);
  const [posts, setPosts] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const isReview = type === 'review';
  const icon = isReview ? faTrophy : faUtensils;
  const getFacebookCode = () => dispatch(getFacebookAccessCode());
  const loadPosts = async () => {
    const endpoint = isReview ? 'ratings?fields=recommendation_type%2Copen_graph_story' : 'photos?type=uploaded';
    const url = `https://graph.facebook.com/v4.0/615026265632013/${endpoint}&limit=10&access_token=${token}`;
    const response = await fetch(url);
    const payload = await response.json();

    if (payload.error) {
      await dispatch(getFacebookAccessCode());
      throw payload.error;
    } else {
      const array = isReview ?
        payload.data.filter(p => p.recommendation_type === 'positive').map(p => p.open_graph_story.id) :
        payload.data.map(post => post.id);
      await new Promise(resolve => setTimeout(resolve, 1000)); // timeout to see loading animation
      setPosts(array);
    }
  };

  const preconditionCall = token ? null : getFacebookCode;
  const asyncCall = token ? loadPosts : null;
  const label = isReview
    ? 'Revisa lo que nuestra comunidad piensa de nuestros servicios.'
    : 'Observa ejemplos de nuestros servicios más recientes.';

  return (
    <div className="social-posts">
      <p className={showSlider ? 'social-label' : 'social-label-hidden'}>
        <Zoom in={showSlider} timeout={3000}><FontAwesomeIcon icon={icon}/></Zoom>{label}
      </p>
      <FetchButton id={`${type}-button`} color="primary" label="Cargar desde Facebook" errorLabel="Intentelo de nuevo"
                   icon={icon} hidden={posts.length > 0} onComplete={isSuccess => setShowSlider(isSuccess)}
                   preconditionCall={preconditionCall} asyncCall={asyncCall}/>
      {showSlider && <PostSlider posts={posts} showText={isReview}/>}
    </div>
  );
};

SocialPosts.propTypes = {
  type: PropTypes.oneOf(['review', 'photo']).isRequired,
};

export default React.memo(SocialPosts);