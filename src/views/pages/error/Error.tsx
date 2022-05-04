import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { error } from "../../../dto/error";

function Error(props: {err: error}) {
  const { t } = useTranslation();
  console.log(props.err);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="py-5 text-center">{props.err.code} Error!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center">{t(props.err.descriptionKey)}</p>
        </Col>
      </Row>
    </Container>

  );
}

export default Error;
