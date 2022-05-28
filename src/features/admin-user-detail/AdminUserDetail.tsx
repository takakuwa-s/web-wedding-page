import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { initUser, User } from "../../common/dto/user";
import { useEffect, useState } from "react";
import { getUser, patchUser } from "../../common/utils/userApiCall";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Loading from "../../common/components/loading/Loading";
import AttendanceConfirmItem from "../../common/components/attendance-confirm-item/AttendanceConfirmItem";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import Form from "react-bootstrap/esm/Form";
import FormCheckRadio from "../../common/components/form-check-radio/FormCheckRadio";
import { useAppDispatch } from "../../app/hooks";
import { patchAdminUsers } from "../admin-users/adminUsersSlice";

function AdminUserDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>(initUser());
  const [isLoading, setIsLoading] = useState(false);
  const [isAttandanceUpdateLoading, setIsAttandanceUpdateLoading] = useState(false);
  const [isAdimnUpdateLoading, setIsAdimnUpdateLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  useEffect(() => {
    setIsLoading(true);
    getUser(
      id!,
      u => {
        setUser(u);
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setAlertMsg(t("adminUserDetail.alert.loadErr"));
      },
      () => setIsLoading(false)
    );
  }, [t, id]);

  const updateUser = (updateIsAdmin: boolean, val: boolean) => {
    if (updateIsAdmin) {
      setIsAdimnUpdateLoading(true);
    } else {
      setIsAttandanceUpdateLoading(true);
    }
    patchUser(
      user.id,
      updateIsAdmin ? "isAdmin" : "attendance",
      val,
      () => {
        dispatch(patchAdminUsers({id: user.id, updateIsAdmin: updateIsAdmin, val: val}));
        setAlertVariant("success");
        setAlertMsg(t("adminUserDetail.alert.updateSuccess"));
      },
      e => {
        console.error(e);
        setAlertVariant("danger");
        setAlertMsg(t("adminUserDetail.alert.updateErr"));
      },
      () => {
        if (updateIsAdmin) {
          setIsAdimnUpdateLoading(false);
        } else {
          setIsAttandanceUpdateLoading(false);
        }
      }
    );
  };

  const isAdimnChecks = [
    {
      label: t("adminUserDetail.input.isAdmin.true"),
      checked: user.isAdmin,
      onChange: () => setUser({ ...user, isAdmin: true})
    },
    {
      label: t("adminUserDetail.input.isAdmin.false"),
      checked: !user.isAdmin,
      onChange: () => setUser({ ...user, isAdmin: false})},
  ];
  const attendanceChecks = [
    {
      label: t("adminUserDetail.input.attendance.true"),
      checked: user.attendance,
      onChange: () => setUser({ ...user, attendance: true }),
    },
    {
      label: t("adminUserDetail.input.attendance.false"),
      checked: !user.attendance,
      onChange: () => setUser({ ...user, attendance: false }),
    },
  ];
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("adminUserDetail.title")}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant={alertVariant} />
      {isLoading ? <Loading /> : (
        <Form>
          <Form.Group as={Row} className="my-3" controlId="formIsAdmin">
            <Form.Label column xs={4} sm={{ span: 3, offset: 3 }} lg={{ span: 2, offset: 4 }} className="text-center pt-0 my-1">
              {t("adminUsers.userLabel.isAdmin")}
            </Form.Label>
            <Col xs={8} sm={6} className="my-1">
              <Row>
                <Col xs={12} md={6} lg={5} xl={4}>
                  <FormCheckRadio 
                    name="isAdmin"
                    checks={isAdimnChecks}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SubmitButton
                    className="mt-md-0 mt-3"
                    buttonSize="sm"
                    spinnerSize="sm"
                    buttonText={t("adminUserDetail.button.update")}
                    isLoading={isAdimnUpdateLoading}
                    onClick={() => updateUser(true, user.isAdmin)}/>
                </Col>
              </Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formAttendance">
            <Form.Label column xs={4} sm={{ span: 3, offset: 3 }} lg={{ span: 2, offset: 4 }} className="text-center pt-0 my-1">
              {t("adminUsers.userLabel.attendance")}
            </Form.Label>
            <Col xs={8} sm={6} className="my-1">
              <Row>
                <Col xs={12} md={6} lg={5} xl={4}>
                  <FormCheckRadio 
                    name="attendance"
                    checks={attendanceChecks}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SubmitButton
                    className="mt-md-0 mt-3"
                    buttonSize="sm"
                    spinnerSize="sm"
                    buttonText={t("adminUserDetail.button.update")}
                    isLoading={isAttandanceUpdateLoading}
                    onClick={() => updateUser(false, user.attendance)}/>
                </Col>
              </Row>
            </Col>
          </Form.Group>
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.name")}
            value={`${user.familyName} ${user.firstName}`}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.nameKana")}
            value={`${user.familyNameKana} ${user.firstNameKana}`}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.follow")}
            value={user.follow ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.registered")}
            value={user.registered ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.guestType")}
            value={t(`attendance.guestType.${user.guestType.toLowerCase()}`)}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.phone")}
            value={user.phoneNumber}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.postalCode")}
            value={user.postalCode}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.address")}
            value={user.address}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.allergy")}
            value={user.allergy}
          />
          <AttendanceConfirmItem
            label={t("adminUsers.userLabel.message")}
            value={user.message}
            as="pre"
          />
        </Form>
      )}
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            disabled={isAttandanceUpdateLoading || isAdimnUpdateLoading}
            onClick={() => navigate("/admin")}
          >{t("common.button.back")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUserDetail;