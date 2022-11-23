import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import "./i18n/configs";
import 'bootstrap/dist/css/bootstrap.min.css';
import liff from '@line/liff';
import LIFFInspectorPlugin from '@line/liff-inspector';
import { logEvent } from 'firebase/analytics';
import { analytics } from './common/utils/firebase';
import store from './app/store'
import { Provider } from 'react-redux'
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

if (process.env.REACT_APP_ENV === 'dev') {
  liff.use(new LIFFInspectorPlugin());
}
let element: JSX.Element;
liff
  .init({
    liffId: process.env.REACT_APP_LIFF_ID || '',
    withLoginOnExternalBrowser: false
  })
  .then(() => {
    if (window.location.pathname !== '/image/buik_download' && !liff.isLoggedIn()) {
      liff.login();
    }
    element = <App/>;
  })
  .catch((e) => {
    logEvent(analytics, 'init error occurs');
    element = <ErrorPage err={{
      code: 500,
      message: e.message,
      descriptionKey: 'error.description.init'
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
