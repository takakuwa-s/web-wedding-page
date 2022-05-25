import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function Admin() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="py-5 text-center">Admin</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
