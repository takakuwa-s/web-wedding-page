import React from 'react';
import Countdown from '../countdown/Countdown';
import GreetingMessage from '../greeting-message/GreetingMessage';
import Host from '../host/Host';
import Information from '../information/Information';
import Top from '../top/Top';
import './Home.scss';


function Home() {
  return (
    <React.Fragment>
      <Top />
      <GreetingMessage />
      <Host />
      <Countdown />
      <Information />
    </React.Fragment>
  );
}

export default Home;
