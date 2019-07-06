import './MyQuotations.scss';
import image from 'assets/img/my-quotations.jpg';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import History from 'app/router/History';
import Action from 'app/features/quotations/home/action/Action';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';

const MyQuotations = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);

  const handleListRedirect = () => {
    if (!loggedUser) {
      dispatch(AuthDialogActions.openAuthDialog());
      return;
    }

    History.navigate('/presupuestos/todos');
  };

  return (
    <>
      <Action id="my-quotations" image={image} className="animated bounceInDown" onClick={handleListRedirect}>
        Mis Presupuestos
      </Action>

      <AuthDialog onSuccess={handleListRedirect}/>
    </>
  );
};

export default React.memo(MyQuotations);