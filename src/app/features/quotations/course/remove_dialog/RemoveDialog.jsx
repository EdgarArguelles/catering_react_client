import './RemoveDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import {decreasePrice, removeCourse} from 'app/features/quotations/menu/MenuReducer';

const RemoveDialog = ({course, open, onClose}) => {
  const dispatch = useDispatch();
  const dishes = useSelector(state => state.data.dishes);
  const removeAction = () => {
    dispatch(removeCourse({courseTypeId: course.type.id, position: course.position}));
    dispatch(decreasePrice(getDishesPrice(course.dishes, dishes)));
  };

  return (
    <ConfirmationDialog className="remove-dialog" title="Remover tiempo" open={open} onClose={onClose} okLabel="Remover"
                        onOK={() => onClose(removeAction)} label="¿Desea remover este tiempo de su menú?"/>
  );
};

RemoveDialog.propTypes = {
  course: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(RemoveDialog);