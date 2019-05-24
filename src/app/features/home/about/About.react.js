import './About.scss';
import image from '../../../../assets/img/about-img.jpg';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '../../../common/components/image/Image.react';
import SectionHeader from '../SectionHeader.react';
import AboutItem from './about_item/AboutItem.react';

export default class About extends React.Component {
  static propTypes = {};

  render() {
    return (
      <section id="about">
        <Grid container alignItems="center">
          <Grid item xs={12} lg={6}>
            <SectionHeader title="Quienes somos">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </SectionHeader>
            <AboutItem title="Eiusmod Tempor" iconClass="fas fa-shopping-bag">
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero
              tempore, cum soluta nobis est eligendi
            </AboutItem>
            <AboutItem title="Magni Dolores" iconClass="fas fa-camera-retro">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum
            </AboutItem>
            <AboutItem title="Dolor Sitema" iconClass="fas fa-chart-line">
              Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat tarad limino ata
            </AboutItem>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Image src={image}/>
          </Grid>
        </Grid>
      </section>
    );
  }
}