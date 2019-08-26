import './Google.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import AuthButton from 'app/features/auth/auth_button/AuthButton';

const Google = props => {
  return (
    <AuthButton id="google" url="/oauth/google/signin" classes={{label: 'google-label'}} {...props}>
      <FontAwesomeIcon id="google-icon" className="button-icon" icon={faGoogle}/>Acceder con Google
    </AuthButton>
  );
};

Google.propTypes = {
  subscribe: PropTypes.func.isRequired,
};

export default React.memo(Google);