import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import liff from "@line/liff/dist/lib";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../common/utils/firebase";
import { useNavigate } from "react-router-dom";

function AttendanceComplete(props: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  let title: string;
  let comment1: string;
  let comment2: string;
  let comment3: string;
  if (props.err) {
    logEvent(analytics, "The attendance form submittion is failed");
    console.error(props.err);
    title = t("attendanceComplete.failure.title");
    comment1 = t("attendanceComplete.failure.comment1");
    comment2 = t("attendanceComplete.failure.comment2");
    comment3 = t("attendanceComplete.failure.comment3");
  } else {
    title = t("attendanceComplete.success.title");
    comment1 = t("attendanceComplete.success.comment1");
    comment2 = t("attendanceComplete.success.comment2");
    comment3 = t("attendanceComplete.success.comment3");
  }
  return (
    <div className="form-wrap">
        <div className="form-wrap__inner">
            <div className="form-image"><img src="../app-files/img/form_head03.jpg" alt=""/></div>
            <div className="form-indicator">
                <div className="form-indicator__item">入力</div>
                <div className="form-indicator__item">確認</div>
                <div className="form-indicator__item is-current">完了</div>
            </div>
            <h1 className="form-heading">送信完了しました</h1>
            <p className="form-text">回答の送信が完了しました。<br/>ご回答ありがとうございました。</p>
            <div className="form-finish-button"><a href="../index.html">TOPへ戻る</a></div>
        </div>
    </div>
    // <Container fluid>
    //   <Row>
    //     <Col>
    //       <h2 className="pt-5 text-center">{title}</h2>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <p className="pt-5">{comment1}<br />{comment2}</p>
    //       <p>{comment3}</p>
    //     </Col>
    //   </Row>
    //   <Row className="py-3">
    //     <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //       <Button
    //         type="button"
    //         size="lg"
    //         variant="outline-info"
    //         onClick={() => navigate("/")}
    //       >{t("attendanceComplete.back")}
    //       </Button>
    //     </Col>
    //   </Row>
    //   <Row className="pb-5">
    //     <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //       <Button
    //         type="button"
    //         size="lg"
    //         variant="outline-info"
    //         onClick={() => liff.closeWindow()}
    //       >{t("common.button.close")}
    //       </Button>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

interface IProps {
  err?: Error;
}

export default AttendanceComplete;