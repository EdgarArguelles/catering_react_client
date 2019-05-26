import './ActionButtons.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import QuotationsLoader from 'app/data/quotations/QuotationsLoader.react';
import DeleteQuotation from './delete_quotation/DeleteQuotation.react';
import RevertQuotation from './revert_quotation/RevertQuotation.react';
import SaveQuotation from './save_quotation/SaveQuotation.react';

class ActionButtons extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
    isRemoteProcessing: PropTypes.bool.isRequired,
    quotations: PropTypes.object,
  };

  render() {
    const {quotation, isRemoteProcessing, quotations} = this.props;
    const isEdited = !areEqual(quotation, quotations ? quotations[quotation.id] : null);
    const showDelete = !isEdited;
    const showRevert = isEdited && !!quotation.name;
    const showSave = isEdited && quotation.price > 0;

    return (
      <QuotationsLoader>
        <div id="action-buttons">
          <RevertQuotation hidden={!showRevert}/>
          {(isRemoteProcessing || showDelete) && <DeleteQuotation/>}
          {(isRemoteProcessing || showSave) && <SaveQuotation/>}
        </div>
      </QuotationsLoader>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
    isRemoteProcessing: state.quotations.isRemoteProcessing,
    quotations: state.data.quotations,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);