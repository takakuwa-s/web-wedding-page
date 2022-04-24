import React from 'react';
import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Countdown from '../countdown/Countdown';
import AttendanceForm from '../attendance-form/AttendanceForm';
import GreetingMessage from '../greeting-message/GreetingMessage';
import Host from '../host/Host';
import Information from '../information/Information';
import Top from '../top/Top';
import './App.scss';
import { initUser } from '../../../dto/user';
import AttendanceFormCheck from '../attendance-form-check/AttendanceFormCheck';


function App() {
  const user = initUser();

  return (
    <React.Fragment>
      <WeddingNavbar />
      <Top />
      <GreetingMessage />
      <Host />
      <Countdown />
      <Information />
      <AttendanceForm user={user} />
      <AttendanceFormCheck user={user} />
    </React.Fragment>
  );
}

export default App;
