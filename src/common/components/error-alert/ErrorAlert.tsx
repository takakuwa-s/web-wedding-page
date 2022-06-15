import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/esm/Alert';
import React from 'react';

const ErrorAlert = React.memo((props: IProps) => {
  const clz = props.msg ? 'pt-2' : '';
  return (
    <Row className={clz}>
      <Col>
        <Alert show={!!props.msg} variant={props.variant} className="pb-0 mb-1">
          <p>{props.msg}</p>
        </Alert>
      </Col>
    </Row>
  );
});

interface IProps {
  msg?: string;
  variant: string;
}

export default ErrorAlert;