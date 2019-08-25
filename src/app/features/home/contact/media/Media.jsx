import './Media.scss';
import image from 'assets/img/areli.jpg';
import {version} from '../../../../../../package.json';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

const Media = () => {
  const printVersion = () => alert(`V ${version}`); // eslint-disable-line no-alert

  return (
    <div id="media">
      <Card raised className="card-media">
        <CardContent>
          <div onDoubleClick={printVersion}><Avatar src={image} className="avatar"/></div>
          <Grid container className="social-links" justify="space-around">
            <Fab className="twitter"><i className="fab fa-twitter" aria-hidden="true"/></Fab>
            <Fab className="facebook"><i className="fab fa-facebook" aria-hidden="true"/></Fab>
            <Fab className="instagram"><i className="fab fa-instagram" aria-hidden="true"/></Fab>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Media);