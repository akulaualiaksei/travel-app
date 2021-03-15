import React from 'react';
import Grid from '@material-ui/core/Grid';
import MainSlider from './MainSlider';

import './MainPage.css';

import CountryCard from '../Card/Card';

type Props = {
  history: any;
  children: Array<string>;
};

const MainPage: React.FC<Props> = (props) => {
  const getCountryId = (id: string) => {
    props.history.push(`/country/${id}`);
  };

  return (
    <>
      <MainSlider />
      <h1 className="main-heading"> Visit countries </h1>
      <hr/>
      <Grid className='cards-container' container spacing={4}>
        {React.Children.map(props.children, (countryName) => {
          return <CountryCard id={countryName} getId={getCountryId} />;
        })}
      </Grid>
    </>
  );
};

export default MainPage;
