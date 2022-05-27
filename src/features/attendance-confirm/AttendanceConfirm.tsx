import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { saveUser } from "../../common/utils/userApiCall";
import AttendanceConfirmContent from "../../common/components/attendance-confirm-content/AttendanceConfirmContent";
import { User } from "../../common/dto/user";
import { useState } from "react";

function AttendanceConfirm(props: IProps) {
  const { t } = useTranslation();
  const [diableBackBtn, setDiableBackBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    setDiableBackBtn(true);
    saveUser(
      props.user,
      props.onSaveSuccess,
      props.onSaveError,
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("attendanceConfirm.title")}</h2>
        </Col>
      </Row>
      <AttendanceConfirmContent user={props.user}/>
      <Row className="py-3">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <SubmitButton
            buttonSize="lg"
            spinnerSize="lg"
            buttonText={t("attendanceConfirm.register")}
            isLoading={isLoading}
            onClick={handleRegister}/>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            disabled={diableBackBtn}
            onClick={props.onBackButtonClicked}
          >{t("attendanceConfirm.back")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

interface IProps {
  user: User;
  onBackButtonClicked: () => void;
  onSaveSuccess: (user: User) => void;
  onSaveError: (err: Error) => void;
}

export default AttendanceConfirm;