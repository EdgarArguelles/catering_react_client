import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

export default ComposedComponent => {
  class CateringDialog extends React.Component {
    static propTypes = {
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      closeNavigationDialog: PropTypes.func.isRequired,
    };

    componentWillMount() {
      const {open, onClose, closeNavigationDialog} = this.props;

      if (open) {
        closeNavigationDialog(onClose);
      }
    }

    componentWillUpdate(nextProps) {
      const {open} = this.props;

      if (!open && nextProps.open) {
        nextProps.closeNavigationDialog(nextProps.onClose);
      }

      if (open && !nextProps.open) {
        nextProps.closeNavigationDialog(null);
      }
    }

    render() {
      const {closeNavigationDialog, ...rest} = this.props; // eslint-disable-line no-unused-vars
      return <ComposedComponent {...rest}/>;
    }
  }

  const mapStateToProps = () => {
    return {};
  };

  const mapDispatchToProps = dispatch => {
    return {
      closeNavigationDialog: closeDialog => {
        dispatch(NavigationActions.closeNavigationDialog(closeDialog));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(CateringDialog);
};