import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './Home.scss';

function Information() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container className="mb-5 text-center information-font">
      <Row className="mt-6 mb-3">
        <Col>
          <h2 className="information-title">{t("information.schedule.title")}</h2>
        </Col>
      </Row>
      <div className="schedule-content-font">
        <Row className="my-4">
          <Col xs={{span:8,offset:2}} sm={{span:8,offset:2}} md={{span:6,offset:3}} xl={{span:4,offset:4}}>
            <h3 className="my-5">{t("information.schedule.date")}</h3>
            <h3>{t("information.schedule.weddingCeremony.title")}</h3>
            <p>{t("information.schedule.weddingCeremony.time")}</p>
            <h3 className="mt-5">{t("information.schedule.weddingBanquet.title")}</h3>
            <p>{t("information.schedule.weddingBanquet.time")}</p>
          </Col>
        </Row>
      </div>
      <Row className="mt-7 mb-3">
        <Col>
          <h2 className="information-title">{t("information.venue.title")}</h2>
        </Col>
      </Row>
      <Row className="my-0">
        <Col xm={{span:10,offset:1}} md={{span:8,offset:2}} xxl={{span:6,offset:3}} >
          <p className="mb-0">
            <a href={t("information.venue.link")} target="_blank" rel="noreferrer">{t("information.venue.name")}</a>
          </p>
          <div className="ratio ratio-16x9">
            <iframe
              title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.239493456054!2d139.56944946524771!3d35.275171330291045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60184701ae0f8b25%3A0xe7c641a4b74e326e!2z44K544Kx44O844OX44K5IOOCtiDjgrnjgqPjg7zjg4gg772cIFNDQVBFUyBUSEUgU1VJVEU!5e0!3m2!1sja!2sjp!4v1651220681624!5m2!1sja!2sjp"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </Col>
      </Row>
      <Row className="my-0">
        <Col>
          <p className="mb-0">{t("information.venue.postalCode")}</p>
          <p className="mb-0">{t("information.venue.address")}</p>
          <p className="mt-2 mb-5">
            <a href={"tel:" + t("information.venue.phone")}>{t("information.venue.phone")}</a>
          </p>
          <hr className="mt-5"/>
          <p className="my-0">{t("information.venue.note1")}</p>
          <p className="my-0">{t("information.venue.note2")}</p>
          <p className="mt-0">{t("information.venue.note3")}</p>
          <hr />
        </Col>
      </Row>
      <Row className="mt-7 mb-3">
        <Col>
          <h2 className="information-title">{t("information.note.title")}</h2>
        </Col>
      </Row>
      <Row className="mt-2 mb-0">
        <Col>
          <p className="my-2">{t("information.note.note")}</p>
        </Col>
      </Row>
      <Row className="mt-7 mb-3">
        <Col>
          <h2 className="information-title">{t("information.register.title")}</h2>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <p className="mb-0">{t("information.register.deadline1")}</p>
          <p className="mb-0">{t("information.register.deadline2")}</p>
          <p className="mb-0">{t("information.register.deadline3")}</p>
        </Col>
      </Row>
      <Row>
        <Col className="my-4">
          <Button
            variant="outline-info"
            size="lg"
            onClick={() => navigate("/attendance")}
          >{t("information.register.button")}
          </Button>
        </Col>
      </Row>
      <footer>
        <Row className="mt-4 mb-5">
          <Col>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}

export default Information;