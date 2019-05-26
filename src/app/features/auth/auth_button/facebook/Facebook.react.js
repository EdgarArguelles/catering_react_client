import './Facebook.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AuthButton from 'app/features/auth/auth_button/AuthButton.react';

export default class Facebook extends React.Component {
  static propTypes = {
    subscribe: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AuthButton id="facebook" url="/oauth/facebook/signin" classes={{label: 'facebook-label'}} {...this.props}>
        <i id="facebook-icon" className="fab fa-facebook button-icon" aria-hidden="true"/>Acceder con Facebook
      </AuthButton>
    );
  }
}