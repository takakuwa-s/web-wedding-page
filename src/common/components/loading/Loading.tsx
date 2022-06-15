import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";

function Loading({rowClass = "pt-5 text-center"}: IProps) {
  return (
    <Row className={rowClass}>
      <Col>
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

interface IProps {
  rowClass?: string;
}

export default Loading;