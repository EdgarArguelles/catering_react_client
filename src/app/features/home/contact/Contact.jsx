import './Contact.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Media from './media/Media';
import Content from './content/Content';

const Contact = ({ isHomeScreen }) => {
  const className = isHomeScreen ? 'home-screen' : 'in-dialog';
  const mdMedia = isHomeScreen ? null : 4;
  const mdContent = isHomeScreen ? null : 8;

  return (
    <section id="contact">
      <div className={className}>
        <Grid container className="container" justify="center" alignItems="center" spacing={0}>
          <Grid item xs={12} sm={4} md={mdMedia || 3} lg={mdMedia || 2}>
            <Media/>
          </Grid>
          <Grid item xs={12} sm={8} md={mdContent || 6} lg={mdContent || 4} xl={mdContent || 3}>
            <Content/>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

Contact.propTypes = {
  isHomeScreen: PropTypes.bool,
};

export default React.memo(Contact);