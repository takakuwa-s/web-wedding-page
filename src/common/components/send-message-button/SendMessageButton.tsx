import liff from "@line/liff/dist/lib";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../error-alert/ErrorAlert";

function SendMessageButton(props: IProps) {
  const { t } = useTranslation();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [sentMsg, setSentMsg] = useState(false);

  const checkInvitationMsg = () => {
    liff
      .sendMessages([
        {
          type: "text",
          text: props.msgText,
        },
      ])
      .then(() => {
        setAlertMsg(t("admin.sendMessage.alert.sendSuccess"));
        setAlertVariant("success");
        setSentMsg(true);
      })
      .catch((err) => {
        console.log("error", err);
        setAlertMsg(t("admin.sendMessage.alert.sendErr"));
        setAlertVariant("danger");
      });
  }

  return (
    <>
      <ErrorAlert msg={alertMsg} variant={alertVariant}/>
      <Row className="py-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          {sentMsg ? (
            <Button
              type="button"
              variant="outline-info"
              size="lg"
              onClick={() => liff.closeWindow()}
            >{t("common.button.close")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline-info"
              size="lg"
              onClick={checkInvitationMsg}
            >{t("admin.sendMessage.button.check")}
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

interface IProps {
  msgText: string;
}

export default SendMessageButton;
