import './RemoveMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';

class RemoveMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    removeMenu: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};
  }

  handleRemove = () => {
    const {menu: {id}, removeMenu} = this.props;

    removeMenu(id);
    History.navigate('/presupuestos/editar');
  };

  render() {
    const {isDialogOpen} = this.state;
    const {menu: {name}} = this.props;

    return (
      <div id="remove-menu">
        <Fab variant="extended" color="secondary" onClick={() => this.setState({isDialogOpen: true})}>
          <i className="fas fa-trash-alt button-icon" aria-hidden="true"/>
          <p>Eliminar Menú</p>
        </Fab>

        <ConfirmationDialog title="Eliminar menú" label={`¿Desea eliminar el menú ${name}?`}
                            okID="remove-menu-button" okLabel="Eliminar" open={isDialogOpen}
                            onClose={() => this.setState({isDialogOpen: false})}
                            onOK={this.handleRemove}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMenu: id => {
      dispatch(QuotationActions.removeMenu(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveMenu);