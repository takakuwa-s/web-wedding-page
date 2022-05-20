import React from 'react';
import GreetingMessage from '../greeting-message/GreetingMessage';
import Information from '../information/Information';
import Top from '../top/Top';

function Home() {
  return (
    <React.Fragment>
      <Top />
      <GreetingMessage />
      <Information />
    </React.Fragment>
  );
}

export default Home;
