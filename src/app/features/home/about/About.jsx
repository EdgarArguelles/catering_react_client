import './About.scss';
import image from 'assets/img/about-img.png';
import React from 'react';
import { faCameraRetro, faChartLine, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';
import SectionHeader from 'app/features/home/SectionHeader';
import AboutItem from './about_item/AboutItem';

const About = () => {
  return (
    <section id="about">
      <Grid container alignItems="center">
        <Grid item xs={12} lg={6}>
          <SectionHeader title="Quienes somos">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </SectionHeader>
          <AboutItem title="Eiusmod Tempor" icon={faShoppingBag}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi
          </AboutItem>
          <AboutItem title="Magni Dolores" icon={faCameraRetro}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum
          </AboutItem>
          <AboutItem title="Dolor Sitema" icon={faChartLine}>
            Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat tarad limino ata
          </AboutItem>
        </Grid>
        <Grid item xs={12} lg={6}>
          <img src={image} alt="Quienes somos"/>
        </Grid>
      </Grid>
    </section>
  );
};

export default React.memo(About);