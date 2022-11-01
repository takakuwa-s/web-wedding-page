import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import greetingHeader from "../../resource/greeting-header.png"
import './Home.scss';

function Greeting() {
  const { t } = useTranslation();

  return (
    <>
      <img src={greetingHeader} alt="greeting-header" className="greeting-header-img" />
      <Container fluid className="pb-0">
        <Row className="my-0">
          <Col className="px-0 mx-auto text-center" xs={10} sm={9} md={8} lg={7} xl={6} >
            <pre className="p-3 mb-0 information-content">{t("greetingMessage.content")}</pre>
          </Col>
        </Row>
      </Container>
      <img src={greetingHeader} alt="greeting-footer" className="greeting-header-img mt-0" />
    </>
  );
}

export default Greeting;