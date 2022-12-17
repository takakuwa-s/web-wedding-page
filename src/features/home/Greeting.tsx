import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import greetingHeader from "../../resource/greeting-header.png"
import greetingFooter from "../../resource/greeting-footer.png"
import brideSignature from "../../resource/bride-signature.png"
import groomSignature from "../../resource/groom-signature.png"

import './Home.scss';

function Greeting() {
  const { t } = useTranslation();

  return (
    <>

      <Container fluid>
        <Row className="my-7">
          <Col className="px-0 mx-auto text-center" xs={10} sm={9} md={8} lg={7} xl={6} >
            <div className="position-relative">
              <img src={greetingHeader} alt="greeting-header" className="greeting-img greeting-img-size greeting-img-header" />
              <div className="my-5 py-3 information-content">
                <pre className="mb-0">{t("greetingMessage.content")}</pre>
                <img src={groomSignature} alt="groom-signature" className="signature" />
                <img src={brideSignature} alt="bride-signature" className="signature" />
              </div>
              <img src={greetingFooter} alt="greeting-footer" className="greeting-img greeting-img-size greeting-img-footer mt-0" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Greeting;