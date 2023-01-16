import liff from "@line/liff/dist/lib";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import FormSelect from "../../common/components/form-select/FormSelect";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { multicastMessageToLineBot, sendMessageToChat } from "../../common/utils/lineApiCall";

enum PushMessageType {
  INVITATION_REMINDER = "invitation_reminder",
  REMINDER = "reminder",
  SLIDE_SHOW = "slideshow"
}

function AdminPushNotification() {
  const { t } = useTranslation();
  const [messageType, setMessageType] = useState(PushMessageType.INVITATION_REMINDER);
  const [targetUsers, setTargetUsers] = useState("IsAdmin,t");
  const [msgChecked, setMsgChecked] = useState(false);
  const [isMulticastLoading, setIsMulticastLoading] = useState(false);
  const [isCheckLoading, setIsCheckLoading] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    variant: "danger",
  });

  const checkSendingMsg = () => {
    if (!liff.isApiAvailable('shareTargetPicker')) {
      setAlert({
        msg: t("error.description.unavailableSendMessageErr"),
        variant: "danger",
      })
      return;
    }
    setIsCheckLoading(true);
    sendMessageToChat(
      [{
        type: "text",
        text: t(`adminPushNotification.checkMsgContent.${messageType}`)
      }],
      () => {
        setAlert({
          msg: t("adminPushNotification.alert.sendSuccess"),
          variant: "success",
        })
      },
      err => {
        console.log("error", err);
        setAlert({
          msg: t("adminPushNotification.alert.sendErr"),
          variant: "danger",
        })
      },
      () => setIsCheckLoading(false)
    );
  }

  const multicastMsg = () => {
    setIsMulticastLoading(true);
    const arr: string[] = targetUsers.split(',');
    const falg: string = arr[0];
    const val: boolean = !!arr[1];;
    multicastMessageToLineBot(
      messageType,
      falg,
      val,
      () => {
        setMsgChecked(false);
        setAlert({
          msg: t("adminPushNotification.alert.sendSuccess"),
          variant: "success",
        })
      },
      (err: Error) => {
        console.log("error", err);
        setAlert({
          msg: t("adminPushNotification.alert.sendErr"),
          variant: "danger",
        })
      },
      () => setIsMulticastLoading(false)
    );
  }

  const onSelectMessage = (e: ChangeEvent<HTMLSelectElement>) => {
    setMessageType(e.target.value as PushMessageType)
    setMsgChecked(false);
  };

  const messageOptions = [
    {value: PushMessageType.INVITATION_REMINDER, label: t("adminPushNotification.sellect.invitation_reminder")},
    {value: PushMessageType.REMINDER, label: t("adminPushNotification.sellect.reminder")},
    {value: PushMessageType.SLIDE_SHOW, label: t("adminPushNotification.sellect.slideshow")},
  ];

  const onSelectTargetUsers = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetUsers(e.target.value)
    setMsgChecked(false);
  };

  const targetUsersOptions = [
    {value: "IsAdmin,t", label: t("adminUsers.sellect.admin")},
    {value: "Follow,t", label: t("adminUsers.sellect.follow")},
    {value: "Attendance,t", label: t("adminUsers.sellect.participant")},
    {value: "Attendance,", label: t("adminUsers.sellect.absentee")},
    {value: "Registered,t", label: t("adminUsers.sellect.registered")},
    {value: "Registered,", label: t("adminUsers.sellect.notRegistered")}
  ];

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminPushNotification.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert {...alert}/>
      <Row>
        <Col md={6} xl={4} className="mx-auto">
          <FormSelect onSelect={onSelectMessage} options={messageOptions} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xl={4} className="mx-auto">
          <FormSelect onSelect={onSelectTargetUsers} options={targetUsersOptions} />
        </Col>
      </Row>
      <Row className="my-5">
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
            label={t("adminPushNotification.pushConfirm")}
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
