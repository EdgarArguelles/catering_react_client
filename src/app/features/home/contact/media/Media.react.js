import './Media.scss';
import image from '../../../../../assets/img/areli.jpg';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import {version} from '../../../../../../package.json';

export default class Media extends React.Component {
  static propTypes = {};

  printVersion = () => {
    alert(`V ${version}`); // eslint-disable-line no-alert
  };

  render() {
    return (
      <div id="media">
        <Card raised className="card-media">
          <CardContent>
            <div onDoubleClick={this.printVersion}><Avatar src={image} className="avatar"/></div>
            <Grid container className="social-links" justify="space-around">
              <Fab><i className="fab fa-twitter" aria-hidden="true"/></Fab>
              <Fab><i className="fab fa-facebook" aria-hidden="true"/></Fab>
              <Fab><i className="fab fa-instagram" aria-hidden="true"/></Fab>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}