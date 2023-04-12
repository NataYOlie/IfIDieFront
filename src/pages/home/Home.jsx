import React from 'react';
import {Cards, Header, FunnyDeath } from '../../components'

const Home = (props) => {

  return <div>
    <Header />
    <FunnyDeath
        currentFunnyDeath = {props.currentFunnyDeath}
        refreshFunnyDeath = {props.refreshFunnyDeath}
        getRandomFunnyDeath={props.getRandomFunnyDeath}/>
    <Cards title="Envisager"  />
  </div>;
};

export default Home;
