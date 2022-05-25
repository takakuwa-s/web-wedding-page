import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AttendanceConfirmContent from "../../common/components/attendance-confirm-content/AttendanceConfirmContent";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

function UserDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.val);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("userDetail.title")}</h2>
        </Col>
      </Row>
      {user.isRegistered ?
        (
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
        ) :
        (
          <Row className="pt-5">
            <Col className="text-center">
              <p>{t("userDetail.notRegistered")}</p>
            </Col>
          </Row>
        )}
    </Container>
  );
}

export default UserDetail;