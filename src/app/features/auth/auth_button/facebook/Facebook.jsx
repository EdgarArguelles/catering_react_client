import './Facebook.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AuthButton from 'app/features/auth/auth_button/AuthButton';

const Facebook = props => {
  return (
    <AuthButton id="facebook" url="/oauth/facebook/signin" classes={{label: 'facebook-label'}} {...props}>
      <i id="facebook-icon" className="fab fa-facebook button-icon" aria-hidden="true"/>Acceder con Facebook
    </AuthButton>
  );
};

Facebook.propTypes = {
  subscribe: PropTypes.func.isRequired,
};

export default React.memo(Facebook);