import liff from "@line/liff/dist/lib";
import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import FormSelect from "../../common/components/form-select/FormSelect";
import Loading from "../../common/components/loading/Loading";
import ReloadButton from "../../common/components/reload-button/ReloadButton";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { User } from "../../common/dto/user";
import { getUserList } from "../../common/utils/userApiCall";
import { updateAdminUsers, updateSearchParam } from "./adminUsersSlice";

function AdminUsers() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.adminUsers.val);
  const searchParam = useAppSelector((state: RootState) => state.adminUsers.searchParam);
  const [isCsVLoading, setIsCsVLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [disableReloading, setDisableReloading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    top: "",
    reload: "",
  });
  const USER_LINIT = 50;

  const loadUsers = () => {
    setIsLoading(true);
    setDisableReloading(false);
    const arr = searchParam.split(",");
    const searchFlg = arr[0];
    const searchVal = !!arr[1];
    getUserList(
      USER_LINIT,
      "",
      searchFlg,
      searchVal,
      false,
      u => {
        if (u.length < USER_LINIT) {
          setDisableReloading(true);
        }
        dispatch(updateAdminUsers(u));
        setAlertMsg({
          top: "",
          reload: "",
        });
        setLoaded(true);
      },
      e => {
        console.error(e);
        setDisableReloading(true);
        setAlertMsg({
          top: t("adminUsers.alert.loadErr"),
          reload: "",
        });
      },
      () => setIsLoading(false));
  };

  const reloadUsers = () => {
    setIsReloading(true);
    const arr = searchParam.split(",");
    const searchFlg = arr[0];
    const searchVal = !!arr[1];
    getUserList(
      USER_LINIT,
      users[users.length - 1].id,
      searchFlg,
      searchVal,
      false,
      u => {
        if (u.length < USER_LINIT) {
          setDisableReloading(true);
        }
        const list = users.concat(u);
        dispatch(updateAdminUsers(list));
        setAlertMsg({
          top: "",
          reload: "",
        });
      },
      e => {
        console.error(e);
        setAlertMsg({
          top: "",
          reload: t("adminUsers.alert.reloadErr"),
        });
      },
      () => setIsReloading(false));
  };

  const downloadCsv = () => {
    setIsCsVLoading(true);
    const arr = searchParam.split(",");
    const searchFlg = arr[0];
    const searchVal = !!arr[1];
    getUserList(
      0,
      "",
      searchFlg,
      searchVal,
      true,
      b => {
        setAlertMsg({
          top: "",
          reload: "",
        });
        const url = URL.createObjectURL(b);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${t("adminUsers.csvName")}.csv`;
        a.href = url;
        a.rel = 'noopener'
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      e => {
        console.error(e);
        setAlertMsg({
          top: t("adminUsers.alert.loadErr"),
          reload: "",
        });
      },
      () => setIsCsVLoading(false));
  };

  const options = [
    {value: ",", label: t("adminUsers.sellect.all")},
    {value: "IsAdmin,t", label: t("adminUsers.sellect.admin")},
    {value: "Registered,t", label: t("adminUsers.sellect.registered")},
    {value: "Registered,", label: t("adminUsers.sellect.notRegistered")},
    {value: "Attendance,t", label: t("adminUsers.sellect.participant")},
    {value: "Attendance,", label: t("adminUsers.sellect.absentee")},
    {value: "Follow,t", label: t("adminUsers.sellect.follow")},
    {value: "Follow,", label: t("adminUsers.sellect.unfollow")},
  ];

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => dispatch(updateSearchParam(e.target.value));

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminUsers.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg.top} variant="danger" />
      <Row className="pt-3 pb-3">
        <Col xs={6} sm={{offset:1, span:6}} md={{offset:2, span:5}} lg={{offset:3, span:4}} xl={{offset:4, span:3}}>
          <FormSelect value={searchParam} onSelect={onSelect} options={options} />
        </Col>
        <Col>
          <Button
            className="me-2"
            variant="outline-info"
            onClick={loadUsers}
          >{t("adminUsers.button.search")}
          </Button>
          <SubmitButton
            disabled={liff.getOS() === "ios"}
            spinnerSize="sm"
            isLoading={isCsVLoading}
            buttonText={t("adminUsers.button.csv")}
            onClick={downloadCsv}/>
        </Col>
      </Row>
      {isLoading ? <Loading /> : (
        <Row>
          <Col>
            <Table responsive hover className="text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("adminUsers.userLabel.name")}</th>
                  <th>{t("adminUsers.userLabel.nameKana")}</th>
                  <th>{t("adminUsers.userLabel.isAdmin")}</th>
                  <th>{t("adminUsers.userLabel.attendance")}</th>
                  <th>{t("adminUsers.userLabel.registered")}</th>
                  <th>{t("adminUsers.userLabel.follow")}</th>
                  <th>{t("adminUsers.userLabel.guestType")}</th>
                  <th>{t("adminUsers.userLabel.phone")}</th>
                  <th>{t("adminUsers.userLabel.postalCode")}</th>
                  <th>{t("adminUsers.userLabel.address")}</th>
                  <th>{t("adminUsers.userLabel.allergy")}</th>
                  <th>{t("adminUsers.userLabel.message")}</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {users.map((u: User, idx) => (
                  <tr key={idx} onClick={() => navigate(`/admin/user/${u.id}`)}>
                    <td>{idx + 1}</td>
                    <td>{`${u.familyName} ${u.firstName}`}</td>
                    <td>{`${u.familyNameKana} ${u.firstNameKana}`}</td>
                    <td>{u.isAdmin ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}</td>
                    <td>{u.attendance ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}</td>
                    <td>{u.registered ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}</td>
                    <td>{u.follow ? t("adminUsers.boolAnswer.true") : t("adminUsers.boolAnswer.false")}</td>
                    <td>{t(`attendance.guestType.${u.guestType.toLowerCase()}`)}</td>
                    <td>{u.phoneNumber}</td>
                    <td>{u.postalCode}</td>
                    <td>{u.address}</td>
                    <td>{u.allergy}</td>
                    <td>{u.message}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {loaded && (
        <ReloadButton
          alertMsg={alertMsg.reload}
          isReloading={isReloading}
          disableReload={disableReloading}
          disableReloadBtnTxt={t("adminUsers.button.allLoaded")}
          reloadBtnTxt={t("adminUsers.button.reload")}
          onReloadButtonClicked={reloadUsers}/>
      )}
    </Container>
  );
}

export default AdminUsers;
