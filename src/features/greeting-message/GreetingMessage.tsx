import { useTranslation } from "react-i18next";
import './GreetingMessage.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function GreetingMessage() {
  const { t } = useTranslation();

  return (
    <div className="message-back-ground">
      <Container fluid>
        <Row className="pt-4">
          <Col className="px-0 mx-auto" xs={10} sm={9} md={8} lg={7} xl={6} >
            <pre className="pb-3 message-content">{t("greetingMessage.content")}</pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GreetingMessage;