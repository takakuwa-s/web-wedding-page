import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/esm/Alert';

function ErrorAlert(props: IProps) {
  const clz = props.msg ? 'pt-2' : '';
  return (
    <Row className={clz}>
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