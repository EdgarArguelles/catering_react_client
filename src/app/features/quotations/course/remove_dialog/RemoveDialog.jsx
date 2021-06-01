import './RemoveDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDishesByIds } from 'app/hooks/data/Dishes';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import { decreasePrice, removeCourse } from 'app/features/quotations/menu/MenuReducer';

const RemoveDialog = ({ course, open, onClose }) => {
  const dispatch = useDispatch();
  const { dishes } = useDishesByIds(course.dishes.map(dish => dish.id));
  const removeAction = () => {
    const coursePrice = dishes.reduce((accumulator, dish) => dish.price ? accumulator + dish.price : accumulator, 0);
    dispatch(removeCourse({ courseTypeId: course.type.id, position: course.position }));
    dispatch(decreasePrice(coursePrice));
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