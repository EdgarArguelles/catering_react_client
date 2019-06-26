import './QuotationEdit.scss';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QuotationEditContent from './quotation_edit_content/QuotationEditContent.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const QuotationEdit = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const quotation = useSelector(state => state.quotations.quotation);
  const backLink = loggedUser ? '/presupuestos/todos' : '/presupuestos';
  const {name, menus} = quotation;
  const price = menus ? menus.reduce((accumulator, menu) => accumulator + (menu.price * menu.quantity), 0) : 0;
  const latestBackLink = useRef(backLink);
  const latestName = useRef(name); // avoid to re-run useEffect when name changes
  const latestPrice = useRef(price);

  useEffect(() => {
    // deselect Menu
    dispatch(QuotationActions.selectMenu(''));
    dispatch(QuotationsActions.changeMenuDialogOpen(false));

    if (latestName.current === '') {
      dispatch(QuotationActions.changeName('Mi Presupuesto'));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(NavigationActions.changeNavigation(backLink, 'Mi Presupuesto'));
    latestBackLink.current = backLink;
  }, [dispatch, backLink]);

  useEffect(() => {
    dispatch(QuotationActions.setPrice(price));
    latestPrice.current = price;
  }, [dispatch, price]);

  return <div id="quotation-edit"><QuotationEditContent/></div>;
};

export default React.memo(QuotationEdit);