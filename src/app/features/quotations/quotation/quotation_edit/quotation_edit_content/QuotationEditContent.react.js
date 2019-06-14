import './QuotationEditContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {QuotationEditLoader} from 'app/common/components/content_loaders/ContentLoaders.react';
import EditableField from 'app/common/components/editable_field/EditableField';
import QuotationEditToolbar from './quotation_edit_toolbar/QuotationEditToolbar.react';
import MenuGrid from './menu_grid/MenuGrid.react';
import QuotationNotify from './quotation_notify/QuotationNotify.react';
import QuotationCompleteButton from './quotation_complete_button/QuotationCompleteButton.react';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

class QuotationEditContent extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    quotation: PropTypes.object.isRequired,
    changeQuotationName: PropTypes.func.isRequired,
  };

  getContent = () => {
    const {isFetching, quotation: {id, name}, changeQuotationName} = this.props;

    if (!name || isFetching) {
      return <QuotationEditLoader/>;
    }

    return (
      <React.Fragment>
        <EditableField value={name} placeholder="Nombre del Presupuesto" onChange={changeQuotationName}/>
        <MenuGrid/>
        {id && <div className="quotation-folio">El folio generado para este presupuesto es: <b>{id}</b></div>}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div id="quotation-edit-content">
        <QuotationEditToolbar/>
        <div className="content">{this.getContent()}</div>
        <QuotationNotify/>
        <QuotationCompleteButton/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeQuotationName: name => {
      dispatch(QuotationActions.changeName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationEditContent);