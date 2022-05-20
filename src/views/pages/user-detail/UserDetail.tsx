import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { initUser } from "../../../dto/user";
import { fetchUser } from "../../../utils/user-api-call";
import DataCheckItem from "../../components/data-check-item/DataCheckItem";
import Loading from "../../components/loading/Loading";

function UserDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(initUser());
  useEffect(() => fetchUser(user => setUser(user), () => setIsLoading(false)), []);

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
      <div>
        <DataCheckItem
          label={t("attendance.attendance.label")}
          value={user.attendance ? t("attendance.attendance.attend") : t("attendance.attendance.decline")}
        />
        <DataCheckItem
          label={t("attendance.guestType.label")}
          value={t("attendance.guestType." + user.guestType.toLowerCase())}
        />
        <DataCheckItem
          label={t("attendance.name.label")}
          value={user.familyName + " " + user.firstName}
        />
        <DataCheckItem
          label={t("attendance.nameKana.label")}
          value={user.familyNameKana + " " + user.firstNameKana}
        />
        <DataCheckItem
          label={t("attendance.phone.label")}
          value={user.phoneNumber}
        />
        <DataCheckItem
          label={t("attendance.postalCode.label")}
          value={user.postalCode}
        />
        <DataCheckItem
          label={t("attendance.address.label")}
          value={user.address}
        />
        <DataCheckItem
          label={t("attendance.allergy.label")}
          value={user.allergy}
        />
        <DataCheckItem
          label={t("attendance.message.label")}
          value={user.message}
          as="pre"
        />
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
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("userDetail.title")}</h2>
        </Col>
      </Row>
      {userEl}
    </Container>
  );
}

export default UserDetail;