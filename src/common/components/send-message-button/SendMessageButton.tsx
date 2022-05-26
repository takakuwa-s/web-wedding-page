import liff from "@line/liff/dist/lib";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { PushMessageType } from "../../dto/push-message-type";
import { sendMessageToLineBot } from "../../utils/lineApiCall";

function SendMessageButton(props: IProps) {
  const { t } = useTranslation();

  const checkSendingMsg = () => {
    let checkMsgText: string = "";
    switch (props.pushMsgType) {
      case PushMessageType.INVITATION:
        checkMsgText = t('admin.sendMessage.checkMsgContent.invitation');
        break;
      case PushMessageType.REMINDER:
        checkMsgText = t('admin.sendMessage.checkMsgContent.reminder');
        break;
      default:
        props.onCheckError(new Error("Unknown push message type"));
        return;
    }
    liff
      .sendMessages([
        {
          type: "text",
          text: checkMsgText,
        },
      ])
      .then(props.onCheckSuccess)
      .catch(props.onCheckError);
  }

  const multicastMsg = () => {
    sendMessageToLineBot(
      props.pushMsgType.toLowerCase(),
      props.onMulticastSuccess,
      props.onMulticastError,
      () => {}
    );
  }

  return (
    <>
      <Row className="py-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            onClick={checkSendingMsg}
          >{t("admin.sendMessage.button.check")}
          </Button>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            onClick={multicastMsg}
          >{t("admin.sendMessage.button.send")}
          </Button>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            variant="outline-info"
            size="lg"
            onClick={() => liff.closeWindow()}
          >{t("common.button.close")}
          </Button>
        </Col>
      </Row>
    </>
  );
}

interface IProps {
  pushMsgType: PushMessageType;
  onCheckSuccess: () => void;
  onCheckError: (err: Error) => void;
  onMulticastSuccess: () => void;
  onMulticastError: (err: Error) => void;
}

export default SendMessageButton;
