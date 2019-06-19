import './QuotationEditToolbar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import formatCurrency from 'format-currency';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';
import ActionButtons from './action_buttons/ActionButtons';

class QuotationEditToolbar extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    quotation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isTooltipOpen: false};
  }

  getTooltip = () => {
    const {isTooltipOpen} = this.state;
    const openTooltip = () => this.setState({isTooltipOpen: true});
    const closeTooltip = () => this.setState({isTooltipOpen: false});

    return (
      <Tooltip title="El precio puede variar del original guardado, este es el precio con las tarifas actuales"
               TransitionComponent={Zoom} open={isTooltipOpen} onOpen={openTooltip} onClose={closeTooltip} interactive>
        <IconButton className="price-question" onClick={openTooltip}>
          <i className="fas fa-question" aria-hidden="true"/>
        </IconButton>
      </Tooltip>
    );
  };

  render() {
    const {isFetching, quotation: {id, price, name}} = this.props;

    return (
      <ExpandBar>
        <Toolbar id="quotation-edit-toolbar">
          {!isFetching && name && (
            <div className="quotation-price">
              <div className="price-label">El precio del Presupuesto es:</div>
              <b>{formatCurrency(price, {format: '%s%v', symbol: '$'})}</b>
              {id && this.getTooltip()}
            </div>
          )}
          <ActionButtons/>
        </Toolbar>
      </ExpandBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationEditToolbar);