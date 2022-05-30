import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Loading from '../loading/Loading';
import Button from 'react-bootstrap/esm/Button';
import ErrorAlert from '../error-alert/ErrorAlert';

function ReloadButton(props: IProps) {
  if (props.isReloading) {
    return <Loading />;
  } else if (props.disableReload) {
    return (
      <Row className="py-4">
        <Col lg={8} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="sm"
            variant="outline-dark"
            disabled
          >{props.disableReloadBtnTxt}
          </Button>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <ErrorAlert msg={props.alertMsg} variant="danger" />
        <Row className="py-4">
          <Col lg={8} className="d-grid gap-2 mx-auto">
            <Button
              type="button"
              size="sm"
              variant="outline-info"
              onClick={props.onReloadButtonClicked}
            >{props.reloadBtnTxt}
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

interface IProps {
  alertMsg?: string;
  isReloading: boolean;
  disableReload: boolean;
  disableReloadBtnTxt: string;
  reloadBtnTxt: string;
  onReloadButtonClicked: () => void;
}

export default ReloadButton;