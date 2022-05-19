import React from 'react';
import Countdown from '../countdown/Countdown';
import GreetingMessage from '../greeting-message/GreetingMessage';
import Information from '../information/Information';
import Top from '../top/Top';

function Home() {
  return (
    <React.Fragment>
      <Top />
      <GreetingMessage />
      <Countdown />
      <Information />
    </React.Fragment>
  );
}

export default Home;
