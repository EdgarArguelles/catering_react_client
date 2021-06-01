import './Facebook.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import AuthButton from 'app/features/auth/auth_button/AuthButton';

const Facebook = props => {
  return (
    <AuthButton id="facebook" url="/oauth/facebook/signin" classes={{ label: 'facebook-label' }} {...props}>
      <FontAwesomeIcon id="facebook-icon" className="button-icon" icon={faFacebookSquare}/>Acceder con Facebook
    </AuthButton>
  );
};

Facebook.propTypes = {
  subscribe: PropTypes.func.isRequired,
};

export default React.memo(Facebook);