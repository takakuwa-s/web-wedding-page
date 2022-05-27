import liff from "@line/liff/dist/lib";
import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import SelectForm from "../../common/components/select-form/SelectForm";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { sendMessageToLineBot } from "../../common/utils/lineApiCall";

enum PushMessageType {
  INVITATION = "invitation",
  REMINDER = "reminder"
}

function AdminPushNotification() {
  const { t } = useTranslation();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [messageType, setMessageType] = useState(PushMessageType.INVITATION);
  const [msgChecked, setMsgChecked] = useState(false);
  const [isMulticastLoading, setIsMulticastLoading] = useState(false);
  const [isCheckLoading, setIsCheckLoading] = useState(false);

  const checkSendingMsg = () => {
    setIsCheckLoading(true);
    liff.sendMessages([
        {
          type: "text",
          text: t(`adminPushNotification.checkMsgContent.${messageType}`),
        },
      ])
      .then(() => {
        setAlertMsg(t("adminPushNotification.alert.sendSuccess"));
        setAlertVariant("success");
      })
      .catch(err => {
        console.log("error", err);
        setAlertMsg(t("adminPushNotification.alert.sendErr"));
        setAlertVariant("danger");
      })
      .finally(() => setIsCheckLoading(false)
      );
  }

  const multicastMsg = () => {
    setIsMulticastLoading(true);
    sendMessageToLineBot(
      messageType,
      () => {
        setAlertMsg(t("adminPushNotification.alert.sendSuccess"));
        setAlertVariant("success");
        setMsgChecked(false);
      },
      (err: Error) => {
        console.log("error", err);
        setAlertMsg(t("adminPushNotification.alert.sendErr"));
        setAlertVariant("danger");
      },
      () => setIsMulticastLoading(false)
    );
  }

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setMessageType(e.target.value as PushMessageType)
    setMsgChecked(false);
  };

  const options = [
    {value: PushMessageType.INVITATION, label: t("adminPushNotification.sellect.invitation")},
    {value: PushMessageType.REMINDER, label: t("adminPushNotification.sellect.reminder")},
  ];

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminPushNotification.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant={alertVariant}/>
      <Row>
        <Col md={6} xl={4} className="mx-auto">
          <SelectForm onSelect={onSelect} options={options} />
        </Col>
      </Row>
      <Row className="py-5">
        <Col md={6} xl={4} className="d-grid gap-2 mx-auto">
          <SubmitButton
            buttonSize="lg"
            isLoading={isCheckLoading}
            buttonText={t("adminPushNotification.button.check")}
            onClick={checkSendingMsg}/>
        </Col>
      </Row>
      <Row>
        <Col md={6} xl={4} className="d-grid gap-2 mx-auto">
          <Form.Check 
            type="switch"
            id="msg-checl"
            label={t("adminPushNotification.psuhConfirm")}
            checked={msgChecked}
            onChange={e => setMsgChecked(e.target.checked)}
          />
        </Col>
      </Row>
      <Row className="pt-2">
        <Col md={6} xl={4} className="d-grid gap-2 mx-auto">
          <SubmitButton
            disabled={!msgChecked}
            buttonSize="lg"
            isLoading={isMulticastLoading}
            buttonText={t("adminPushNotification.button.send")}
            onClick={multicastMsg}/>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPushNotification;
