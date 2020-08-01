import './MenuSummary.scss';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import formatCurrency from 'format-currency';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditableField from 'app/common/components/editable_field/EditableField';
import MenuQuantity from './menu_quantity/MenuQuantity';
import RemoveMenu from './remove_menu/RemoveMenu';
import CompleteMenu from './complete_menu/CompleteMenu';
import MenuDialog from './menu_dialog/MenuDialog';
import {changeName} from 'app/features/quotations/menu/MenuReducer';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const MenuSummary = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const menu = quotation.menus.find(m => m.isSelected);
  const changeMenuName = name => dispatch(changeName(name));
  const openMenuDialog = () => dispatch(QuotationsActions.changeMenuDialogOpen(true));
  const {name, price, quantity} = menu;
  const latestName = useRef(name); // avoid to re-run useEffect when name changes
  const newName = useRef(`Mi Menu ${quotation.menus.length}`); // avoid to re-run useEffect when quotation changes
  useEffect(() => {
    latestName.current === '' && dispatch(changeName(newName.current));
  }, [dispatch]);

  return (
    <div id="menu-summary">
      <Paper className="menu-summary-paper" elevation={24}>
        <EditableField value={name} placeholder="Nombre del Menú" onChange={changeMenuName}/>
        <p className="menu-summary-price">
          El precion por persona por este menú es:
          <b className="price"> {formatCurrency(price, {format: '%s%v', symbol: '$'})}</b>
        </p>
        <MenuQuantity/>
        <p className="menu-summary-total">
          El presupuestos por este menú es:
          <b className="price"> {formatCurrency(price * quantity, {format: '%s%v', symbol: '$'})}</b>
        </p>

        <div className="menu-summary-actions">
          <Button color="primary" onClick={openMenuDialog}>Ver Menú</Button>
        </div>
        <div className="menu-summary-actions menu-summary-flex">
          <RemoveMenu/>
          <CompleteMenu/>
        </div>
      </Paper>

      <MenuDialog/>
    </div>
  );
};

export default React.memo(MenuSummary);