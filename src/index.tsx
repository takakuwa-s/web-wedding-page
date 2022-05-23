import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './views/pages/app/App';
import reportWebVitals from './reportWebVitals';
import "./i18n/configs"; //i18
import 'bootstrap/dist/css/bootstrap.min.css';
import liff from '@line/liff/dist/lib';
import Error from './views/pages/error/Error';
import { logEvent } from 'firebase/analytics';
import { analytics } from './utils/firebase';

let element: JSX.Element;
liff
  .init({
    liffId: process.env.REACT_APP_LIFF_ID || '',
    withLoginOnExternalBrowser: false
  })
  .then(() => {
    if (liff.isInClient()) {
      if (liff.isLoggedIn()) {
        element = <App/>;
      } else {
        logEvent(analytics, "liff login error on LINEs in-app browser");
        element = <Error err={{
          code: 500,
          message: 'Not logged in after liff.init()',
          descriptionKey: 'error.description.unknown'
        }}/>;
      }
    } else {
      element = <Error err={{
        code: 500,
        message: "Not opened by LINE's in-app browser",
        descriptionKey: "error.description.notLineInAppBrowser"
      }}/>;
    }
  })
  .catch((e) => {
    logEvent(analytics, 'liff.init error');
    element = <Error err={{
      code: 500,
      message: e.message,
      descriptionKey: "error.description.liff"
    }}/>;
  }).finally(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <>
        {element}
      </>
    );
  });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
