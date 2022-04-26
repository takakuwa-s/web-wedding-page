import { useTranslation } from "react-i18next";
import './Countdown.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function Countdown() {
  const { t } = useTranslation();
  return (
    <div className="cowntdown-back-ground">
      <Container>
        <Row>
            <Col>
              <h2 className="pt-5">{t("cowntdown.title")}</h2>
            </Col>
          </Row>
        <Row>
          <Col>
            <p>To 2023.03.19</p>
            <p>332days and 14:23:34</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Countdown;