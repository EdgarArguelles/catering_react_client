import './Navigation.scss';
import image from '../../../../../assets/img/logo.png';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import History from '../../../../router/History';

class Navigation extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.processed;
    this.timeout = {};
  }

  componentWillUpdate(nextProps) {
    const {navigation} = this.props;
    if (navigation.closeDialog !== nextProps.navigation.closeDialog
      || navigation.backLink !== nextProps.navigation.backLink) {
      // overwrite browser back button only when closeDialog or backLink change
      window.onpopstate = () => {
        // prevent onpopstate trigger twice
        if (!this.processed) {
          this.processed = true;
          if (nextProps.navigation.closeDialog) {
            nextProps.navigation.closeDialog();
            History.go(1);
          } else {
            History.navigate(nextProps.navigation.backLink);
          }

          clearTimeout(this.timeout);
          this.timeout && (this.timeout = setTimeout(() => (this.processed = false), 500));
        }
      };
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  render() {
    const {navigation} = this.props;
    if (navigation.title === '') {
      return <img className="company-logo" src={image} onClick={() => History.navigate('/')}/>;
    }

    return (
      <div id="navigation">
        <IconButton onClick={() => History.navigate(navigation.backLink)}>
          <i className="fas fa-arrow-left" aria-hidden="true"/>
        </IconButton>
        <p>{navigation.title}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.quotations.navigation,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);