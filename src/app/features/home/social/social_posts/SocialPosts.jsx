import './SocialPosts.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy, faUtensils} from '@fortawesome/free-solid-svg-icons';
import Zoom from '@material-ui/core/Zoom';
import FetchButton from 'app/common/components/fetch_button/FetchButton';
import PostSlider from './post_slider/PostSlider';

const SocialPosts = ({type}) => {
  const [showSlider, setShowSlider] = useState(false);
  const isReview = type === 'review';
  const icon = isReview ? faTrophy : faUtensils;
  const label = isReview
    ? 'Revisa lo que nuestra comunidad piensa de nuestros servicios.'
    : 'Observa ejemplos de nuestros servicios más recientes.';

  return (
    <div className="social-posts">
      <p className={showSlider ? 'social-label' : 'social-label-hidden'}>
        <Zoom in={showSlider} timeout={3000}><FontAwesomeIcon icon={icon}/></Zoom>{label}
      </p>
      <FetchButton id={`${type}-button`} color="primary" label="Cargar desde Facebook" hidden={showSlider} icon={icon}
                   asyncCall={async () => await new Promise(resolve => setTimeout(resolve, 3000))}
                   onComplete={() => setShowSlider(true)}/>
      {showSlider && <PostSlider type={type}/>}
    </div>
  );
};

SocialPosts.propTypes = {
  type: PropTypes.oneOf(['review', 'photo']).isRequired,
};

export default React.memo(SocialPosts);