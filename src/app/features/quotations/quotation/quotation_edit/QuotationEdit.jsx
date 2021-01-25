import './QuotationEdit.scss';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QuotationEditContent from './quotation_edit_content/QuotationEditContent';
import {changeNavigation} from 'app/features/quotations/header/navigation/NavigationReducer';
import {changeName, selectMenu, setPrice} from 'app/features/quotations/quotation/QuotationReducer';
import {selectDish} from 'app/features/quotations/dish/DishReducer';
import {changeMenuDialogOpen} from 'app/features/quotations/QuotationsReducer';

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
    dispatch(selectMenu(''));
    dispatch(selectDish(''));
    dispatch(changeMenuDialogOpen(false));

    latestName.current === '' && dispatch(changeName('Mi Presupuesto'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeNavigation({backLink, title: 'Mi Presupuesto'}));
    latestBackLink.current = backLink;
  }, [dispatch, backLink]);

  useEffect(() => {
    dispatch(setPrice(price));
    latestPrice.current = price;
  }, [dispatch, price]);

  return <div id="quotation-edit"><QuotationEditContent/></div>;
};

export default React.memo(QuotationEdit);