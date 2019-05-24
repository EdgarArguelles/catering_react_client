import './EditQuotation.scss';
import image from '../../../../../../assets/img/edit-quotation.jpg';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import History from '../../../../../router/History';
import {getEditPath} from '../../../quotation/Quotation.service';
import Action from '../Action.react';

class EditQuotation extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
  };

  render() {
    const {quotation} = this.props;

    return (
      <Action id="edit-quotation" image={image} className="animated bounceInDown"
              onClick={() => History.navigate(getEditPath(quotation))}>
        Continuar con el Presupuesto
      </Action>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotation);