import React from 'react';
import {Cards, Header} from '../../components'

const Home = (props) => {

  return <div>
    <Header />

    <Cards title=""
           currentFunnyDeath = {props.currentFunnyDeath}
           refreshFunnyDeath = {props.refreshFunnyDeath}
           getRandomFunnyDeath={props.getRandomFunnyDeath}/>
  </div>;
};

export default Home;
