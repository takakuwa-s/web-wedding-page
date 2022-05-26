import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/esm/Alert';

function ErrorAlert(props: IProps) {
  return (
    <Row className="pt-2">
      <Col>
        <Alert show={!!props.msg} variant={props.variant} className="pb-0">
          <p>{props.msg}</p>
        </Alert>
      </Col>
    </Row>
  );
}

interface IProps {
  msg: string;
  variant: string;
}

export default ErrorAlert;