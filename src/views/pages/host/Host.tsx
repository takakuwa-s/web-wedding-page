import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import './Host.scss';
import bride from "./../../../resource/bride.jpeg"
import groom from "./../../../resource/groom.jpeg"

function Host() {
  const { t } = useTranslation();
  return (
    <div className="host-back-ground">
      <Container>
        <Row>
            <Col>
              <h2 className="pt-5">{t("host.title")}</h2>
            </Col>
          </Row>
        <Row>
          <Col>
            <img className="host-image py-5" alt="groom" src={groom}/>
            <p className="groom-bride-title">{t("host.groom.title")}</p>
            <p className="groom-bride-name">{t("host.groom.name")}</p>
            <p className="groom-bride-comment">{t("host.groom.comment")}</p>
          </Col>
          <Col>
            <img className="host-image py-5" alt="bride" src={bride}/>
            <p className="groom-bride-title">{t("host.bride.title")}</p>
            <p className="groom-bride-name">{t("host.bride.name")}</p>
            <p className="groom-bride-comment">{t("host.bride.comment")}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Host;