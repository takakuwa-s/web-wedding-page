import React from 'react';
import { useTranslation } from 'react-i18next';
import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Form from '../form/Form';
import './App.scss';
import seaImg from "./../../../resource/sea.jpeg";

function App() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <WeddingNavbar />
      <img src={seaImg} alt="seaImg" className='w-100'/>
      <Form />
    </React.Fragment>
  );
}

export default App;
