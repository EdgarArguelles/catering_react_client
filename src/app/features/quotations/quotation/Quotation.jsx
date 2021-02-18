import './Quotation.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import formatCurrency from 'format-currency';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import History from 'app/router/History';
import {useQuotation} from 'app/hooks/data/Quotations';
import {areEqual} from './Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import {revertQuotation} from 'app/features/quotations/quotation/QuotationReducer';

const Quotation = ({index, quotation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.app.theme);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldOverwrite, setShouldOverwrite] = useState(false);
  const [remoteId, setRemoteId] = useState(null);
  const {data: remote} = useQuotation(remoteId);
  const {data: selectedRemote} = useQuotation(remoteId ? selectedQuotation.id : null);
  const {id} = quotation;
  const createdAt = quotation.createdAt ? moment(`${quotation.createdAt}Z`) : moment();
  const dialogLabel = 'Al seleccionar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';
  const selectQuotation = () => {
    dispatch(revertQuotation(remote));
    History.navigate('/presupuestos/editar');
  };

  const handleSelectQuotation = () => {
    if (selectedQuotation.id === id) {
      History.navigate('/presupuestos/editar');
    } else {
      setRemoteId(id);
      setShouldOverwrite(true);
    }
  };

  const overwriteLocalChanges = () => {
    setShouldOverwrite(false);
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, selectedRemote);
    if (isQuotationStarted && isEdited) {
      setIsDialogOpen(true);
    } else {
      setTimeout(() => selectQuotation(id), 0);
    }
  };

  remote && shouldOverwrite && overwriteLocalChanges();

  return (
    <>
      <ButtonBase focusRipple className="quotation" onClick={handleSelectQuotation}>
        <Card raised className={`${theme} quotation-card`}>
          <CardContent>
            <Avatar className="avatar">{index + 1}</Avatar>
            <p className="title">{quotation.name}</p>
            <p className="price">
              El precio de este presupuesto es:<br/>
              <span className="amount">{formatCurrency(quotation.price, {format: '%s%v', symbol: '$'})}</span>
            </p>
            <div className="date">
              <p className="relative-date">Creado {createdAt.locale('es').fromNow()}</p>
              <p className="exact-date"> ({createdAt.locale('es').format('LLLL')})</p>
            </div>
          </CardContent>
        </Card>
      </ButtonBase>

      <ConfirmationDialog title="Seleccionar presupuesto" label={dialogLabel} okLabel="Continuar" open={isDialogOpen}
                          onClose={() => setIsDialogOpen(false)} onOK={() => selectQuotation(quotation.id)}/>
    </>
  );
};

Quotation.propTypes = {
  index: PropTypes.number.isRequired,
  quotation: PropTypes.object.isRequired,
};

export default React.memo(Quotation);