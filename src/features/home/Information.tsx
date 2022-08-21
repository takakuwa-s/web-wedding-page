import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './Home.scss';

function Information() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="information-back-ground">
      <Container fluid className="pb-5">
        <Row className="py-4">
          <Col className="px-0 mx-auto text-center" xs={10} sm={9} md={8} lg={7} xl={6} >
            <pre className="p-3 mb-0 information-content">{t("greetingMessage.content")}</pre>
          </Col>
        </Row>
        <Row className="py-4">
          <Col xs={10} sm={9} md={8} lg={7} xl={6} className="information-content mx-auto py-3">
            <Table size="sm" className="information-table">
              <tbody>
                <tr>
                  <th className="text-center">{t("information.schedule.title")}</th>
                </tr>
                <tr><td>{t("information.schedule.date")}</td></tr>
                <tr>
                  <td>{t("information.schedule.ceremony")}</td>
                </tr>
                <tr><td>{t("information.schedule.reception")}</td></tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="py-4">
          <Col xs={10} sm={9} md={8} lg={7} xl={6} className="information-content mx-auto py-3">
            <Table size="sm" className="information-table">
              <tbody>
                <tr>
                  <th className="text-center">{t("information.venue.title")}</th>
                </tr>
                <tr>
                  <td>
                    <a href={t("information.venue.link")} target="_blank" rel="noreferrer">{t("information.venue.name")}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href={"tel:" + t("information.venue.phone")}>{t("information.venue.phone")}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{t("information.venue.postalCode")}</span><br />
                    <span>{t("information.venue.address")}</span>
                    <div className="ratio ratio-16x9">
                      <iframe
                        title="google-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.239493456054!2d139.56944946524771!3d35.275171330291045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60184701ae0f8b25%3A0xe7c641a4b74e326e!2z44K544Kx44O844OX44K5IOOCtiDjgrnjgqPjg7zjg4gg772cIFNDQVBFUyBUSEUgU1VJVEU!5e0!3m2!1sja!2sjp!4v1651220681624!5m2!1sja!2sjp"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t("information.venue.note")}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="pt-4 pb-5">
          <Col xs={10} sm={9} md={8} lg={7} xl={6} className="information-content mx-auto py-3 text-center">
            <Table size="sm" className="information-table">
              <tbody>
                <tr><th>{t("information.register.title")}</th></tr>
                <tr><td>{t("information.register.deadline")}</td></tr>
                <tr>
                  <td>
                  <Button
                    variant="outline-info"
                    size="lg"
                    onClick={() => navigate("/attendance")}
                  >{t("information.register.button")}
                  </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Information;