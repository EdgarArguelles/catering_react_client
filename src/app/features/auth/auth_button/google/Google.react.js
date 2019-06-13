import './Google.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AuthButton from 'app/features/auth/auth_button/AuthButton';

export default class Google extends React.Component {
  static propTypes = {
    subscribe: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AuthButton id="google" url="/oauth/google/signin" classes={{label: 'google-label'}} {...this.props}>
        <i id="google-icon" className="fab fa-google button-icon" aria-hidden="true"/>Acceder con Google
      </AuthButton>
    );
  }
}