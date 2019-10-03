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
import {areEqual} from './Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

const Quotation = ({index, quotation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.app.theme);
  const quotations = useSelector(state => state.data.quotations);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {id} = quotation;
  const createdAt = quotation.createdAt ? moment(`${quotation.createdAt}Z`) : moment();
  const dialogLabel = 'Al seleccionar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';
  const selectQuotation = () => {
    dispatch(QuotationsActions.fetchQuotation(id));
    History.navigate('/presupuestos/editar');
  };

  const handleSelectQuotation = () => {
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, quotations ? quotations[selectedQuotation.id] : null);

    if (selectedQuotation.id === id) {
      History.navigate('/presupuestos/editar');
      return;
    }

    if (isQuotationStarted && isEdited) {
      setIsDialogOpen(true);
      return;
    }

    selectQuotation(id);
  };

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