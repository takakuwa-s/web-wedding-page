import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import liff from "@line/liff/dist/lib";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../utils/firebase";

function AttendanceComplete() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state: any = location.state;

  let title: string;
  let comment1: string;
  let comment2: string;
  let comment3: string;
  if (state && state.err) {
    logEvent(analytics, "The attendance form submittion is failed");
    console.error(state.err);
    title = t("attendanceComplete.failure.title");
    comment1 = t("attendanceComplete.failure.comment1");
    comment2 = t("attendanceComplete.failure.comment2");
    comment3 = t("attendanceComplete.failure.comment3");
  } else {
    title = t("attendanceComplete.success.title");
    comment1 = t("attendanceComplete.success.comment1");
    comment2 = t("attendanceComplete.success.comment2");
    comment3 = t("attendanceComplete.success.comment3");
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="pt-5">{comment1}<br />{comment2}</p>
          <p>{comment3}</p>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="lg"
            variant="outline-info"
            onClick={() => navigate("/")}
          >{t("attendanceComplete.back")}
          </Button>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="lg"
            variant="outline-info"
            onClick={() => liff.closeWindow()}
          >{t("attendanceComplete.close")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AttendanceComplete;