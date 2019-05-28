import React from 'react';
import ContentLoader from 'react-content-loader';
import Grid from '@material-ui/core/Grid';

export const CourseContentLoader = props => (
  <ContentLoader height={110} width={800} speed={1} {...props}>
    <circle cx="45" cy="61" r="20"/>
    <circle cx="120" cy="30" r="5"/>
    <rect x="140" y="25" width="450" height="9"/>
    <circle cx="120" cy="60" r="5"/>
    <rect x="140" y="55" width="450" height="9"/>
    <circle cx="120" cy="90" r="5"/>
    <rect x="140" y="85" width="450" height="9"/>
    <rect x="720" y="20" width="60" height="12"/>
    <circle cx="750" cy="65" r="15"/>
  </ContentLoader>
);

export const CategoryContentLoader = props => (
  <ContentLoader height={250} width={800} speed={1} {...props}>
    <rect x="5" y="30" width="25" height="6"/>
    <circle cx="30" cy="34" r="10"/>
    <rect x="55" y="28" width="130" height="8"/>
    <rect x="300" y="30" width="25" height="6"/>
    <circle cx="330" cy="34" r="10"/>
    <rect x="355" y="28" width="130" height="8"/>
    <rect x="600" y="30" width="25" height="6"/>
    <circle cx="630" cy="34" r="10"/>
    <rect x="655" y="28" width="130" height="8"/>
    <rect x="5" y="80" width="25" height="6"/>
    <circle cx="30" cy="84" r="10"/>
    <rect x="55" y="78" width="130" height="8"/>
    <rect x="300" y="80" width="25" height="6"/>
    <circle cx="330" cy="84" r="10"/>
    <rect x="355" y="78" width="130" height="8"/>
  </ContentLoader>
);

export const DishLoader = props => (
  <ContentLoader height={300} width={400} speed={1} {...props}>
    <rect x="0" y="0" width="400" height="230"/>
    <rect x="10" y="240" width="380" height="60"/>
  </ContentLoader>
);

export const MultipleDishLoader = props => (
  <ContentLoader height={104} width={88} speed={1} {...props}>
    <rect x="0" y="0" width="88" height="104"/>
  </ContentLoader>
);

export const QuotationItemLoader = props => (
  <ContentLoader height={250} width={400} speed={1} {...props}>
    <circle cx="200" cy="40" r="25"/>
    <rect x="100" y="100" width="200" height="15"/>
    <rect x="70" y="150" width="280" height="8"/>
    <rect x="150" y="170" width="100" height="8"/>
    <rect x="120" y="200" width="150" height="8"/>
    <rect x="110" y="220" width="170" height="6"/>
  </ContentLoader>
);

export const QuotationEditLoader = () => (
  <React.Fragment>
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={12}>
        <ContentLoader height={10} width={200} speed={1}>
          <rect x="70" y="5" width="55" height="4"/>
          <circle cx="130" cy="3" r="3"/>
        </ContentLoader>
      </Grid>
      {Array(5).fill('loader').map((value, index) => (
        <Grid key={`${value}-${index}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <ContentLoader height={250} width={400} speed={1}>
            <circle cx="60" cy="40" r="25"/>
            <rect x="130" y="35" width="180" height="15"/>
            <circle cx="370" cy="30" r="5"/>
            <circle cx="370" cy="40" r="5"/>
            <circle cx="370" cy="50" r="5"/>
            <rect x="50" y="90" width="300" height="15"/>
            <rect x="150" y="110" width="100" height="15"/>
            <rect x="20" y="150" width="380" height="4"/>
            <rect x="50" y="170" width="150" height="8"/>
            <rect x="320" y="170" width="60" height="8"/>
            <rect x="50" y="195" width="200" height="8"/>
            <rect x="340" y="195" width="40" height="8"/>
            <rect x="50" y="220" width="100" height="8"/>
            <rect x="300" y="220" width="80" height="8"/>
          </ContentLoader>
        </Grid>
      ))}
    </Grid>
  </React.Fragment>
);