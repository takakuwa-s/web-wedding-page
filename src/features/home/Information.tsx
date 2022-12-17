import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import './Home.scss';

function Information() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const config = useAppSelector((state: RootState) => state.config.config);
  return (
    <Container className="mb-5 text-center information-font">
      <Row className="mt-6 mb-3">
        <Col>
          <h2 className="information-title">{t("information.schedule.title")}</h2>
        </Col>
      </Row>
      <div className="schedule-content-font">
        <Row className="my-4 mx-auto">
          <Col>
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6514.479761471579!2d139.5744359!3d35.2751617!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60184701ae0f8b25%3A0xe7c641a4b74e326e!2z44K544Kx44O844OX44K5IOOCtiDjgrnjgqPjg7zjg4g!5e0!3m2!1sja!2ssg!4v1669013869917!5m2!1sja!2ssg"
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
          <pre className="mb-5 taxi-info">{t("information.venue.note1")}</pre>
          <pre className="taxi-info">{t("information.venue.note2")}</pre>
          <hr/>
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
          {config.attendanceFeatureAvailable ? (
            <Button
              variant="outline-info"
              size="lg"
              onClick={() => navigate("/attendance")}
            >{t("information.register.button")}
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              aria-disabled
              size="lg"
            >{t("information.register.buttonDisabled")}
            </Button>
          )
          }
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