import './Services.scss';
import React from 'react';
import { faAt, faChartPie, faDesktop, faPaperPlane, faRoad, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';
import SectionHeader from 'app/features/home/SectionHeader';
import Service from './service/Service';

const Services = () => {
  const getServices = () => {
    return [
      <Service title="Lorem Ipsum" icon={faDesktop}>
        Voluptatum deleniti atque corrupti quos dolores et quas molestias
        excepturi sint occaecati cupiditate non provident
      </Service>,
      <Service title="Dolor Sitemas" icon={faChartPie}>
        Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat tarad limino ata
      </Service>,
      <Service title="Sed ut perspiciatis" icon={faPaperPlane}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur
      </Service>,
      <Service title="Magni Dolor" icon={faAt}>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum
      </Service>,
      <Service title="Nemo Enim" icon={faRoad}>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
        praesentium voluptatum deleniti atque
      </Service>,
      <Service title="Eiusmod Temp" icon={faShoppingBag}>
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero
        tempore, cum soluta nobis est eligendi
      </Service>,
    ];
  };

  return (
    <section id="services">
      <Grid container>
        <Grid item xs={12}>
          <SectionHeader title="Services">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque
          </SectionHeader>
        </Grid>
        <Grid container spacing={2}>
          {getServices().map((service, index) => <Grid key={index} item xs={12} sm={6} lg={4}>{service}</Grid>)}
        </Grid>
      </Grid>
    </section>
  );
};

export default React.memo(Services);