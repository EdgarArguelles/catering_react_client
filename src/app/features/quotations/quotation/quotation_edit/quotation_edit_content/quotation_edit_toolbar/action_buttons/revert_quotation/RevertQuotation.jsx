import './RevertQuotation.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHistory, faTrash} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

const RevertQuotation = ({hidden}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const quotation = useSelector(state => state.quotations.quotation);
  const isRemoteProcessing = useSelector(state => state.quotations.isRemoteProcessing);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotations = useSelector(state => state.data.quotations);

  const {id, name} = quotation;
  const showError = !loggedUser && !!id;
  const icon = id ? faHistory : faTrash;
  const idAction = id ? 'revert-quotation-button' : 'remove-quotation-button';
  const labelAction = id ? 'Revertir' : 'Eliminar';
  const label = id ? 'cambios' : 'presupuesto';
  const labelDialog = id ? 'los cambios de' : 'el presupuesto';
  const deleteLocal = () => dispatch(QuotationsActions.deleteLocal());
  const revertQuotation = () => dispatch(QuotationActions.revertQuotation(quotations[id]));

  const revertDeleteQuotation = () => {
    if (id) {
      setIsDialogOpen(false);
      revertQuotation();
    } else {
      deleteLocal();
      History.navigate('/presupuestos');
    }
  };

  const animateIcon = () => Utils.animateIcon('revert-button-icon');
  const handleClick = () => {
    setIsDialogOpen(!showError);
    setIsErrorOpen(showError);
    animateIcon();
  };

  return (
    <span id="revert-quotation">
        <Zoom in={!isRemoteProcessing && !isFetching && !hidden} timeout={1000} unmountOnExit>
          <Fab variant="extended" color="secondary" className="revert-button" onClick={handleClick}
               onMouseEnter={animateIcon}>
            <FontAwesomeIcon id="revert-button-icon" className="button-icon" icon={icon}/>
            <div className="button-label">{`${labelAction} ${label}`}</div>
          </Fab>
        </Zoom>

        <Snackbar open={isErrorOpen} autoHideDuration={3000} message="Usuario sin sesión" TransitionComponent={Slide}
                  onClose={() => setIsErrorOpen(false)}/>
        <ConfirmationDialog title={`${labelAction} ${label}`} okID={idAction} okLabel={labelAction} open={isDialogOpen}
                            label={`¿Desea ${labelAction.toLowerCase()} ${labelDialog} ${name}?`}
                            onClose={() => setIsDialogOpen(false)} onOK={revertDeleteQuotation}/>
      </span>
  );
};

RevertQuotation.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default React.memo(RevertQuotation);