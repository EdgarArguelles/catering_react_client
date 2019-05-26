import './Menu.scss';
import React from 'react';
import Button from '@material-ui/core/Button';
import ContactDialog from 'app/features/quotations/header/contact_dialog/ContactDialog.react';
import HomeLink from './home_link/HomeLink.react';
import User from './user/User.react';

export default class Menu extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {isContactDialogOpen: false};
  }

  openContactDialog = () => {
    this.setState({isContactDialogOpen: true});
  };

  closeDialog = () => {
    this.setState({isContactDialogOpen: false});
  };

  render() {
    const {isContactDialogOpen} = this.state;

    return (
      <div id="menu">
        <HomeLink/>
        <Button color="inherit" onClick={this.openContactDialog}>
          <i className="fas fa-phone" aria-hidden="true"/>
          <p>Contactanos</p>
        </Button>
        <User/>
        <ContactDialog open={isContactDialogOpen} onClose={this.closeDialog}/>
      </div>
    );
  }
}