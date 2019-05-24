/**
 * Validate if user is authenticated in order to load the component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AuthActions from './auth/AuthActions';

export default ComposedComponent => {
  class PingServer extends React.Component {
    static propTypes = {
      ping: PropTypes.func.isRequired,
    };

    componentWillMount() {
      this.props.ping();
    }

    componentWillUpdate() {
      this.props.ping();
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = () => {
    return {};
  };

  const mapDispatchToProps = dispatch => {
    return {
      ping: () => {
        dispatch(AuthActions.fetchPing());
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(PingServer);
};