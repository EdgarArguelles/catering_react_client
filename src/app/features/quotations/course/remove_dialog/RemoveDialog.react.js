import './RemoveDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import ConfirmationDialog from 'app/common/components/catering_dialog/confirmation_dialog/ConfirmationDialog.react';
import MenuActions from 'app/features/quotations/menu/MenuActions';

class RemoveDialog extends React.Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    dishes: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    removeCourse: PropTypes.func.isRequired,
    decreasePrice: PropTypes.func.isRequired,
  };

  remove = () => {
    const {course, dishes, onClose, removeCourse, decreasePrice} = this.props;

    removeCourse(course.type.id, course.position);
    decreasePrice(getDishesPrice(course.dishes, dishes));
    onClose();
  };

  render() {
    const {open, onClose} = this.props;

    return (
      <ConfirmationDialog className="remove-dialog" title="Remover tiempo"
                          label="¿Desea remover este tiempo de su menú?" okLabel="Remover"
                          open={open} onClose={onClose} onOK={this.remove}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.data.dishes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCourse: (courseTypeId, position) => {
      dispatch(MenuActions.removeCourse(courseTypeId, position));
    },
    decreasePrice: amount => {
      dispatch(MenuActions.decreasePrice(amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);