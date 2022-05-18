import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";

function Loading() {
  return (
    <Row className='pt-5 text-center'>
      <Col>
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

export default Loading;