import './QuotationEditToolbar.scss';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Utils from 'app/common/Utils';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';
import ActionButtons from './action_buttons/ActionButtons';

const QuotationEditToolbar = () => {
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotation = useSelector(state => state.quotations.quotation);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const {id, price, name} = quotation;

  const getTooltip = () => {
    const openTooltip = () => setIsTooltipOpen(true);
    const closeTooltip = () => setIsTooltipOpen(false);
    const animateIcon = () => Utils.animateIcon('price-question-icon');
    const handleClick = () => {
      animateIcon();
      openTooltip();
    };

    return (
      <Tooltip title="El precio puede variar del original guardado, este es el precio con las tarifas actuales"
               TransitionComponent={Zoom} open={isTooltipOpen} onOpen={openTooltip} onClose={closeTooltip} interactive>
        <IconButton className="price-question" onClick={handleClick} onMouseEnter={animateIcon}>
          <FontAwesomeIcon id="price-question-icon" icon={faQuestion}/>
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <ExpandBar>
      <Toolbar id="quotation-edit-toolbar">
        {!isFetching && name && (
          <div className="quotation-price">
            <div className="price-label">El precio del Presupuesto es:</div>
            <b>{formatCurrency(price, {format: '%s%v', symbol: '$'})}</b>
            {id && getTooltip()}
          </div>
        )}
        <ActionButtons/>
      </Toolbar>
    </ExpandBar>
  );
};

export default React.memo(QuotationEditToolbar);