import './Google.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AuthButton from 'app/features/auth/auth_button/AuthButton';

const Google = props => {
  return (
    <AuthButton id="google" url="/oauth/google/signin" classes={{label: 'google-label'}} {...props}>
      <i id="google-icon" className="fab fa-google button-icon" aria-hidden="true"/>Acceder con Google
    </AuthButton>
  );
};

Google.propTypes = {
  subscribe: PropTypes.func.isRequired,
};

export default React.memo(Google);