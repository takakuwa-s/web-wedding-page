import { useTranslation } from "react-i18next";
import './AttendanceConfirm.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { User } from "../../../dto/user";
import { useLocation, useNavigate } from "react-router-dom";
import AttendanceConfirmItem from "../../components/attendance-confirm-item/AttendanceConfirmItem";
import Button from "react-bootstrap/esm/Button";
import { saveUser } from "../../../utils/api-call";

function AttendanceConfirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { user: User };

  const handleRegister = () => {
    let code: number
    saveUser(state.user)
      .then(res => {
        code = res.status;
        return res.json();
      })
      .then(res => {
        if (code === 200) {
          navigate("/attendance/complete");
        } else {
          throw new Error(res.error);
        }
      })
      .catch(e => navigate("/attendance/complete", { state: {err: e}}));
  };

  return (
    <Container fluid className="form-check-back-ground">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("attendanceConfirm.title")}</h2>
        </Col>
      </Row>
      <AttendanceConfirmItem
        label={t("attendance.attendance.label")}
        value={state.user.attendance ? t("attendance.attendance.attend") : t("attendance.attendance.decline")}
      />
      <AttendanceConfirmItem
        label={t("attendance.guestType.label")}
        value={t("attendance.guestType." + state.user.guestType.toLowerCase())}
      />
      <AttendanceConfirmItem
        label={t("attendance.name.label")}
        value={state.user.familyName + " " + state.user.firstName}
      />
      <AttendanceConfirmItem
        label={t("attendance.nameKana.label")}
        value={state.user.familyNameKana + " " + state.user.firstNameKana}
      />
      <AttendanceConfirmItem
        label={t("attendance.phone.label")}
        value={state.user.phoneNumber}
      />
      <AttendanceConfirmItem
        label={t("attendance.postalCode.label")}
        value={state.user.postalCode}
      />
      <AttendanceConfirmItem
        label={t("attendance.address.label")}
        value={state.user.address}
      />
      <AttendanceConfirmItem
        label={t("attendance.allergy.label")}
        value={state.user.allergy}
      />
      <AttendanceConfirmItem
        label={t("attendance.message.label")}
        value={state.user.message}
        as="pre"
      />
      <Row className="py-3">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="lg"
            onClick={handleRegister}
          >{t("attendanceConfirm.register")}
          </Button>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="lg"
            onClick={() => navigate("/", { state: {user: state.user}})}
          >{t("attendanceConfirm.back")}
          </Button>
        </Col>
      </Row>

    </Container>
  );
}

export default AttendanceConfirm;