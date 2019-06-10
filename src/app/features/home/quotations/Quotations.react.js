import './Quotations.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SectionHeader from 'app/features/home/SectionHeader.react';
import Information from './information/Information.react';
import Access from './access/Access.react';

export default class Quotations extends React.Component {
  static propTypes = {};

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibility);
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }

  handleVisibility = () => {
    const video = document.getElementById('video').contentWindow;
    const shouldPause = video && document.visibilityState === 'hidden';
    shouldPause && video.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  };

  render() {
    return (
      <section id="quotations">
        <Grid container justify="center">
          <Grid item xs={12}>
            <SectionHeader title="Crea un Presupuesto">
              Consulta la amplia y selecta variedad de platillos que ofrecemos para ti,
              explora y experimenta creando los menus que mejor se adapte a las
              necesidades de tu evento, obten un presupuesto y sigue modificando tus menus
              hasta obtener la calidad y presupuesto adecuado.
            </SectionHeader>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Information/>
          </Grid>
          <Grid item className="video" xs={12} sm={6}>
            <iframe id="video" src="https://www.youtube.com/embed/qq_5UQry3T4?enablejsapi=1" frameBorder="0"
                    allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
          </Grid>
          <Grid item xs={12}>
            <hr/>
          </Grid>
          <Grid item xs={12}>
            <Access/>
          </Grid>
        </Grid>
      </section>
    );
  }
}