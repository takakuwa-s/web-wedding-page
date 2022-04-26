import { useTranslation } from "react-i18next";
import './AttendanceConfirm.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { User } from "../../../dto/user";

function AttendanceConfirm(props: IProps) {
  const { t } = useTranslation();
  return (
    <Container fluid className="form-check-back-ground">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("attendanceConfirm.title")}</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3} xl={{ span: 2, offset: 1 }}>
          <p className="text-center">{t("attendance.name.label")}</p>
        </Col>
        <Col sm={8}>
          <p className="text-center">{props.user.familyName + props.user.firstName}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AttendanceConfirm;

interface IProps {
  user: User;
}