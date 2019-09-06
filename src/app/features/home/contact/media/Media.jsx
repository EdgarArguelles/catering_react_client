import './Media.scss';
import image from 'assets/img/areli.jpg';
import {version} from '../../../../../../package.json';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Utils from 'app/common/Utils';

const Media = () => {
  const printVersion = () => alert(`V ${version}`); // eslint-disable-line no-alert
  const animateTwitter = () => Utils.animateIcon('media-twitter-icon');
  const animateFacebook = () => Utils.animateIcon('media-facebook-icon');
  const animateInstagram = () => Utils.animateIcon('media-instagram-icon');

  return (
    <div id="media">
      <Card raised className="card-media">
        <CardContent>
          <div onDoubleClick={printVersion}><Avatar src={image} className="avatar"/></div>
          <Grid container className="social-links" justify="space-around">
            <Fab className="twitter" onClick={animateTwitter} onMouseEnter={animateTwitter}>
              <FontAwesomeIcon id="media-twitter-icon" icon={faTwitter}/>
            </Fab>
            <Fab className="facebook" onClick={animateFacebook} onMouseEnter={animateFacebook}>
              <FontAwesomeIcon id="media-facebook-icon" icon={faFacebook}/>
            </Fab>
            <Fab className="instagram" onClick={animateInstagram} onMouseEnter={animateInstagram}>
              <FontAwesomeIcon id="media-instagram-icon" icon={faInstagram}/>
            </Fab>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Media);