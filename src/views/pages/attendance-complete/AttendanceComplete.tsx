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
  let comment: string;
  if (state && state.err) {
    logEvent(analytics, "The attendance form submittion is failed");
    console.error(state.err);
    title = t("attendanceComplete.failure.title");
    comment = t("attendanceComplete.failure.comment");
  } else {
    title = t("attendanceComplete.success.title");
    comment = t("attendanceComplete.success.comment");
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
          <p className="pt-5 text-center">{comment}</p>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="lg"
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
            onClick={() => liff.closeWindow()}
          >{t("attendanceComplete.close")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AttendanceComplete;