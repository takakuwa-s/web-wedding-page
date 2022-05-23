import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { initUser } from "../../../dto/user";
import { fetchUser } from "../../../utils/user-api-call";
import AttendanceConfirmContent from "../../components/attendance-confirm-content/AttendanceConfirmContent";
import ErrorAlert from "../../components/error-alert/ErrorAlert";
import Loading from "../../components/loading/Loading";

function UserDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(initUser());
  const [alertMsg, setAlertMsg] = useState("");
  useEffect(() => fetchUser(
    user => {
      setAlertMsg("");
      setUser(user);
    },
    e => {
      console.error(e);
      setAlertMsg(t("userDetail.alert"));
    },
    () => setIsLoading(false))
  , [t]);

  let userEl;
  if (isLoading) {
    userEl = <Loading />;
  } else if (!user.isRegistered) {
    userEl = (
      <Row className="pt-5">
        <Col className="text-center">
          <p>{t("userDetail.notRegistered")}</p>
        </Col>
      </Row>
    );
  } else {
    userEl = (
      <>
        <AttendanceConfirmContent user={user}/>
        <Row className="pt-3 pb-5">
          <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
            <Button
              type="button"
              size="lg"
              variant="outline-info"
              onClick={() => navigate("/attendance", { state: {user: user}})}
            >{t("userDetail.edit")}
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("userDetail.title")}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} />
      {userEl}
    </Container>
  );
}

export default UserDetail;