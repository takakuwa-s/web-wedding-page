import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import './Information.scss';

function Information() {
  const { t } = useTranslation();
  return (
    <div className="information-back-ground">
      <Container>
        <Row>
            <Col>
              <h2 className="pt-5">{t("information.title")}</h2>
            </Col>
          </Row>
        <Row>
          <Col>
            <p className="groom-bride-title">{t("information.venue")}</p>
            <p className="groom-bride-title">{t("information.address")}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Information;