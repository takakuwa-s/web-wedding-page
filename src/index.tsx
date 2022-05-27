import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import "./i18n/configs";
import 'bootstrap/dist/css/bootstrap.min.css';
import liff from '@line/liff/dist/lib';
import { logEvent } from 'firebase/analytics';
import { analytics } from './common/utils/firebase';
import store from './app/store'
import { Provider } from 'react-redux'
import { callInitApi } from './common/utils/initApiCall';
import { GuestType } from './common/dto/user';
import ErrorPage from './features/error-page/ErrorPage';
import Loading from './common/components/loading/Loading';
import Container from 'react-bootstrap/esm/Container';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className="h-100 d-flex align-items-center justify-content-center vh-100">
    <Container fluid>
      <Loading />
    </Container>
  </div>
);

let element: JSX.Element;
let initApiHttpStatusCode: number;
let errDescriptionKey: string = "error.description.liff";
liff
  .init({
    liffId: process.env.REACT_APP_LIFF_ID || '',
    withLoginOnExternalBrowser: true
  })
  .then(() => {
    if (liff.isLoggedIn()) {
      return callInitApi();
    } else {
      logEvent(analytics, "liff login error on LINEs in-app browser");
      errDescriptionKey = "error.description.unknown";
      throw new Error("Not logged in after liff.init()");
    }
  })
  .then((res: Response) => {
    initApiHttpStatusCode = res.status;
    return res.json();
  })
  .then((res) => {
    if (initApiHttpStatusCode === 200) {
      const user = res.data.user;
      const filse = res.data.files;
      if (!user.guestType) {
        user.guestType = GuestType.GROOM;
      }
      element = <App user={user} files={filse}/>;
    } else {
      errDescriptionKey = "error.description.init";
      throw new Error(res.error);
    }
  })
  .catch((e) => {
    logEvent(analytics, 'init error occurs');
    element = <ErrorPage err={{
      code: 500,
      message: e.message,
      descriptionKey: errDescriptionKey
    }}/>;
  }).finally(() => {
    root.render(
      <Provider store={store}>
        {element}
      </Provider>
    );
  });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
