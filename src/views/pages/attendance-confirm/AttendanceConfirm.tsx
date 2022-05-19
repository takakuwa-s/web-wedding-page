import { useTranslation } from "react-i18next";
import './AttendanceConfirm.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { User } from "../../../dto/user";
import { useLocation, useNavigate } from "react-router-dom";
import DataCheckItem from "../../components/data-check-item/DataCheckItem";
import Button from "react-bootstrap/esm/Button";
import SubmitButton from "../../components/submit-button/SubmitButton";
import { saveUser } from "../../../utils/user-api-call";

function AttendanceConfirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { user: User };

  const handleRegister = () => {
    saveUser(
      state.user,
      () => navigate("/attendance/complete"),
      e => navigate("/attendance/complete", { state: {err: e}})
    );
  };

  return (
    <Container fluid className="form-check-back-ground">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("attendanceConfirm.title")}</h2>
        </Col>
      </Row>
      <DataCheckItem
        label={t("attendance.attendance.label")}
        value={state.user.attendance ? t("attendance.attendance.attend") : t("attendance.attendance.decline")}
      />
      <DataCheckItem
        label={t("attendance.guestType.label")}
        value={t("attendance.guestType." + state.user.guestType.toLowerCase())}
      />
      <DataCheckItem
        label={t("attendance.name.label")}
        value={state.user.familyName + " " + state.user.firstName}
      />
      <DataCheckItem
        label={t("attendance.nameKana.label")}
        value={state.user.familyNameKana + " " + state.user.firstNameKana}
      />
      <DataCheckItem
        label={t("attendance.phone.label")}
        value={state.user.phoneNumber}
      />
      <DataCheckItem
        label={t("attendance.postalCode.label")}
        value={state.user.postalCode}
      />
      <DataCheckItem
        label={t("attendance.address.label")}
        value={state.user.address}
      />
      <DataCheckItem
        label={t("attendance.allergy.label")}
        value={state.user.allergy}
      />
      <DataCheckItem
        label={t("attendance.message.label")}
        value={state.user.message}
        as="pre"
      />
      <Row className="py-3">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <SubmitButton
            variant="outline-info"
            buttonText={t("attendanceConfirm.register")}
            onClick={handleRegister}/>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            onClick={() => navigate("/attendance", { state: {user: state.user}})}
          >{t("attendanceConfirm.back")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AttendanceConfirm;