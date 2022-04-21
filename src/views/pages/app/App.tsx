import React from 'react';
import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Countdown from '../countdown/Countdown';
import Form from '../form/Form';
import GreetingMessage from '../greeting-message/GreetingMessage';
import Host from '../host/Host';
import Information from '../information/Information';
import Top from '../top/Top';
import './App.scss';


function App() {
  return (
    <React.Fragment>
      <WeddingNavbar />
      <Top />
      <GreetingMessage />
      <Host />
      <Countdown />
      <Information />
      <Form />
    </React.Fragment>
  );
}

export default App;
