import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './Information.scss';

function Information() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="information-back-ground">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t("information.title")}</h2>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} sm={10} md={9} lg={8} xl={7} className="mx-auto">
            <Table size="sm" className="information-table">
              <tbody>
                <tr>
                  {/* <th scope="row">{t("information.venue.lable")}</th> */}
                  <td>
                    <a href={t("information.venue.link")} target="_blank" rel="noreferrer">{t("information.venue.value")}</a>
                  </td>
                </tr>
                <tr>
                  {/* <th scope="row">{t("information.phone.lable")}</th> */}
                  <td>
                    <a href={"tel:" + t("information.phone.value")}>{t("information.phone.value")}</a>
                  </td>
                </tr>
                <tr>
                  {/* <th scope="row">{t("information.address.lable")}</th> */}
                  <td>
                    <span>{t("information.address.postalCode")}</span><br />
                    <span>{t("information.address.value")}</span>
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
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="pt-3 pb-5">
          <Col className="text-center">
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/attendance")}
            >{t("information.register")}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Information;