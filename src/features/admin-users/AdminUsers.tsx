import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Loading from "../../common/components/loading/Loading";
import ReloadButton from "../../common/components/reload-button/ReloadButton";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { User } from "../../common/dto/user";
import { getUserList } from "../../common/utils/userApiCall";

function AdminUsers() {
  const { t } = useTranslation();
  const [isCsVLoading, setIsCsVLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [searchFlg, setSearchFlg] = useState("");
  const [searchVal, setSearchVal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const USER_LINIT = 3;

  const onChangeSellct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const arr = e.target.value.split(",");
    setSearchFlg(arr[0]);
    setSearchVal(!!arr[1]);
  }

  const loadUsers = () => {
    setIsLoading(true);
    setIsAll(false);
    getUserList(
      USER_LINIT,
      "",
      searchFlg,
      searchVal,
      false,
      u => {
        if (u.length < USER_LINIT) {
          setIsAll(true);
        }
        setUsers(u);
        setAlertMsg("");
        setLoaded(true);
      },
      e => {
        console.error(e);
        setAlertMsg(t("adminUser.alert.loadErr"));
      },
      () => setIsLoading(false));
  };

  const reloadUsers = () => {
    setIsReloading(true);
    getUserList(
      USER_LINIT,
      users[users.length - 1].id,
      searchFlg,
      searchVal,
      false,
      u => {
        if (u.length < USER_LINIT) {
          setIsAll(true);
        }
        const list = users.concat(u);
        setUsers(list);
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setAlertMsg(t("adminUser.alert.reloadErr"));
      },
      () => setIsReloading(false));
  };

  const downloadCsv = () => {
    setIsCsVLoading(true);
    getUserList(
      0,
      "",
      searchFlg,
      searchVal,
      true,
      b => {
        setAlertMsg("");
        const url = URL.createObjectURL(b);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${t("adminUser.csvName")}.csv`;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      e => {
        console.error(e);
        setAlertMsg(t("adminUser.alert.loadErr"));
      },
      () => setIsCsVLoading(false));
  };

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminUser.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant="danger" />
      <Row className="pt-3 pb-3">
        <Col xs={6} sm={{offset:1, span:6}} md={{offset:2, span:5}} lg={{offset:3, span:4}} xl={{offset:4, span:3}}>
          <Form.Select onChange={onChangeSellct}>
            <option value={","}>{t("adminUser.sellect.all")}</option>
            <option value={"IsAdmin,t"}>{t("adminUser.sellect.admin")}</option>
            <option value={"Registered,t"}>{t("adminUser.sellect.registered")}</option>
            <option value={"Registered,"}>{t("adminUser.sellect.notRegistered")}</option>
            <option value={"Attendance,t"}>{t("adminUser.sellect.participant")}</option>
            <option value={"Attendance,"}>{t("adminUser.sellect.absentee")}</option>
          </Form.Select>
        </Col>
        <Col>
          <Button
            className="me-2"
            variant="outline-info"
            onClick={loadUsers}
          >{t("adminUser.button.search")}
          </Button>
          <SubmitButton
            spinnerSize="sm"
            isLoading={isCsVLoading}
            buttonText={t("adminUser.button.csv")}
            onClick={downloadCsv}/>
        </Col>
      </Row>
      {isLoading ? <Loading /> : (
        <Row>
          <Col>
            <Table responsive className="text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("adminUser.table.th.name")}</th>
                  <th>{t("adminUser.table.th.nameKana")}</th>
                  <th>{t("adminUser.table.th.isAdmin")}</th>
                  <th>{t("adminUser.table.th.registered")}</th>
                  <th>{t("adminUser.table.th.attendance")}</th>
                  <th>{t("adminUser.table.th.guestType")}</th>
                  <th>{t("adminUser.table.th.phone")}</th>
                  <th>{t("adminUser.table.th.postalCode")}</th>
                  <th>{t("adminUser.table.th.address")}</th>
                  <th>{t("adminUser.table.th.allergy")}</th>
                  <th>{t("adminUser.table.th.message")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: User, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{`${u.familyName} ${u.firstName}`}</td>
                    <td>{`${u.familyNameKana} ${u.firstNameKana}`}</td>
                    <td>{u.isAdmin ? t("adminUser.table.td.bool.true") : t("adminUser.table.td.bool.false")}</td>
                    <td>{u.registered ? t("adminUser.table.td.bool.true") : t("adminUser.table.td.bool.false")}</td>
                    <td>{u.attendance ? t("adminUser.table.td.bool.true") : t("adminUser.table.td.bool.false")}</td>
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
          isReloading={isReloading}
          disableReload={isAll}
          disableReloadBtnTxt={t("adminUser.button.allLoaded")}
          reloadBtnTxt={t("adminUser.button.reload")}
          onReloadButtonClicked={reloadUsers}/>
      )}
    </Container>
  );
}

export default AdminUsers;
