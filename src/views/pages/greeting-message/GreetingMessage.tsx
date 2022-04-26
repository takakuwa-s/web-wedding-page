import { useTranslation } from "react-i18next";
import './GreetingMessage.scss';
import greeting from "./../../../resource/greeting.jpeg"
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function GreetingMessage() {
  const { t } = useTranslation();
  return (
    <div className="message-back-ground">
      <Container>
        <Row>
          <Col>
            <img className="greeting-image py-5" alt="greeting" src={greeting} />
          </Col>
        </Row>
        <Row>
          <Col>
            <pre className="content">{t("greetingMessage.content")}</pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GreetingMessage;