import './AddDish.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import DishActions from 'app/features/quotations/dish/DishActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

class AddDish extends React.Component {
  static propTypes = {
    dishCategory: PropTypes.string.isRequired,
    cleanFilters: PropTypes.func.isRequired,
    deselectDish: PropTypes.func.isRequired,
  };

  handleAdd = () => {
    const {dishCategory, cleanFilters, deselectDish} = this.props;

    cleanFilters();
    deselectDish();
    History.navigate(`/presupuestos/platillos?categoria=${dishCategory}`);
  };

  render() {
    return (
      <Button className="add-dish" onClick={this.handleAdd}>
        <i className="fas fa-plus-circle" aria-hidden="true"/>
      </Button>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    cleanFilters: () => {
      dispatch(DishFilterActions.cleanFilters());
    },
    deselectDish: () => {
      dispatch(DishActions.selectDish(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDish);