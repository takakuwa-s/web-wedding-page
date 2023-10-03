import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AttendanceConfirmContent from "../../common/components/attendance-confirm-content/AttendanceConfirmContent";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Loading from "../../common/components/loading/Loading";
import '../attendance/Attendance.scss';

function UserDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.user);
  const fetched = useAppSelector((state: RootState) => state.user.fetched);
  const config = useAppSelector((state: RootState) => state.config.config);
  let content;
  if (fetched) {
    if (user.registered) {
      content = 
        <>
          <AttendanceConfirmContent user={user}/>
          <Row className="pt-3 pb-5">
            <Col sm={4} xl={3} xxl={2} className="form-confirm-button">
              {config.attendanceFeatureAvailable ? (
                <Button
                  type="button"
                  size="lg"
                  variant="outline-info"
                  onClick={() => navigate("/attendance", { state: {user: user}})}
                >{t("userDetail.edit")}
                </Button>
              ) : (
                <Button
                  variant="outline-dark"
                  aria-disabled
                  size="lg"
                >{t("information.register.buttonDisabled")}
                </Button>
              )
              }
            </Col>
          </Row>
        </>;
    } else {
      content =
        <Row className="pt-5">
          <Col className="text-center">
            <p>{t("userDetail.notRegistered")}</p>
          </Col>
        </Row>
    }
  } else {
    content = <Loading />
  }

  return (
    <div className="form-wrap">
      <div className="form-wrap__inner">
        <h1 className="form-heading">ご回答内容</h1>
        {content}
      </div>
    </div>
  );
}

export default UserDetail;