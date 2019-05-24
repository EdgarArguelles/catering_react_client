import './SelectedDishDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import cateringDialog from '../../../../common/components/catering_dialog/CateringDialog';
import Animate from '../../../../common/components/animate/Animate.react';
import Dish from '../Dish.react';
import DishHeader from './dish_header/DishHeader.react';
import DishActions from '../DishActions';

const CateringDialog = cateringDialog(Dialog);

class SelectedDishDialog extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    dish: PropTypes.object,
    deselectDish: PropTypes.func.isRequired,
  };

  render() {
    const {fullScreen, dish, deselectDish} = this.props;
    const dishName = dish ? `${dish.id} - ${dish.name}` : '';
    const visible = !!dish;
    const delayOut = 1000;

    return (
      <Animate visible={visible} animationIn="zoomInUp" animationOut="zoomOutUp" delayOut={delayOut}>
        <CateringDialog id="selected-dish-dialog" fullWidth={true} maxWidth="sm" fullScreen={fullScreen}
                        dish-name={dishName} onClose={deselectDish} open={visible} transitionDuration={delayOut}>
          <DialogTitle className="selected-dish-dialog-title">
            {dish ? <DishHeader dish={dish} onClose={fullScreen ? deselectDish : null}/> : <div/>}
          </DialogTitle>
          <DialogContent className="selected-dish-dialog-content">
            {dish ? <Dish dish={dish}/> : <div className="empty"/>}
          </DialogContent>
          {!fullScreen && <DialogActions><Button onClick={deselectDish}>Cerrar</Button></DialogActions>}
        </CateringDialog>
      </Animate>
    );
  }
}

const mapStateToProps = state => {
  return {
    dish: state.data.dishes ? state.data.dishes[state.quotations.dish.selected] : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deselectDish: () => {
      dispatch(DishActions.selectDish(''));
    },
  };
};

export default withMobileDialog()(connect(mapStateToProps, mapDispatchToProps)(SelectedDishDialog));