import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import SendMessageButton from "../../common/components/send-message-button/SendMessageButton";
import { PushMessageType } from "../../common/dto/push-message-type";

function AdminInvitation() {
  const { t } = useTranslation();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const onCheckSuccess = () => {
    setAlertMsg(t("admin.sendMessage.alert.sendSuccess"));
    setAlertVariant("success");
  };

  const onCheckError = (err: Error) => {
    console.log("error", err);
    setAlertMsg(t("admin.sendMessage.alert.sendErr"));
    setAlertVariant("danger");
  }

  const onMulticastSuccess = () => {
    setAlertMsg(t("admin.sendMessage.alert.sendSuccess"));
    setAlertVariant("success");
  };

  const onMulticastError = (err: Error) => {
    console.log("error", err);
    setAlertMsg(t("admin.sendMessage.alert.sendErr"));
    setAlertVariant("danger");
  }

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminInvitation.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant={alertVariant}/>
      <SendMessageButton
        pushMsgType={PushMessageType.INVITATION}
        onCheckSuccess={onCheckSuccess}
        onCheckError={onCheckError}
        onMulticastSuccess={onMulticastSuccess}
        onMulticastError={onMulticastError}
      />
    </Container>
  );
}

export default AdminInvitation;
