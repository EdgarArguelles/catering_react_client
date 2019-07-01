import './RemoveDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import MenuActions from 'app/features/quotations/menu/MenuActions';

const RemoveDialog = ({course, open, onClose}) => {
  const dispatch = useDispatch();
  const dishes = useSelector(state => state.data.dishes);

  const remove = () => {
    dispatch(MenuActions.removeCourse(course.type.id, course.position));
    dispatch(MenuActions.decreasePrice(getDishesPrice(course.dishes, dishes)));
    onClose();
  };

  return (
    <ConfirmationDialog className="remove-dialog" title="Remover tiempo" open={open} onClose={onClose} onOK={remove}
                        label="¿Desea remover este tiempo de su menú?" okLabel="Remover"/>
  );
};

RemoveDialog.propTypes = {
  course: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(RemoveDialog);