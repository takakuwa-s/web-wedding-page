import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { saveUser } from "../../common/utils/userApiCall";
import AttendanceConfirmContent from "../../common/components/attendance-confirm-content/AttendanceConfirmContent";
import { User } from "../../common/dto/user";
import { useState } from "react";

function AttendanceConfirm(props: IProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // saveUser(
    //   props.user,
    //   props.onSaveSuccess,
    //   props.onSaveError,
    //   props.onSaveComplete,
    // );
    props.onSaveComplete();
  };

  return (
    <div className="form-wrap">
        <div className="form-wrap__inner">
          <div className="form-image"><img src="../app-files/img/form_head02.jpg" alt=""/></div>
          <div className="form-indicator">
            <div className="form-indicator__item">入力</div>
            <div className="form-indicator__item is-current">確認</div>
            <div className="form-indicator__item">完了</div>
          </div>
            <h1 className="form-heading">入力内容確認</h1>
            <p className="form-text">入力内容にお間違いがないかご確認ください。</p>
            <table className="form-confirm-table">
              <tbody>
                <tr>
                  <th>お名前</th>
                  <td>久原　彩華</td>
                </tr>
                <tr>
                  <th>ふりがな</th>
                  <td>くばら　あやか</td>
                </tr>
                <tr>
                  <th>出欠</th>
                  <td>出席</td>
                </tr>
                <tr>
                  <th>新郎新婦との関係性</th>
                  <td>新婦側</td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>335-0023</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>埼玉県戸田市本町2-3-12 レオネクストONE戸田公園203号室</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>realhyphen1582@icloud.com</td>
                </tr>
                <tr>
                  <th>アレルギーや苦手な食材</th>
                  <td>たまご、甲殻類、生物</td>
                </tr>
                <tr>
                  <th>お連れ様追加</th>
                  <td>久原朋也</td>
                  <td></td>
                  <td>久原花織</td>
                  <td>たまご</td>
                </tr>
                <tr>
                  <th>メッセージ</th>
                  <td>回答内容ダミー回答内容ダミー回答内容ダミー回答内容ダミー回答内容ダミー</td>
                </tr>
              </tbody>
            </table>
            <form className="form-confirm-button" action="./finish.html">
              <button type="button" onClick={handleRegister}>送信する</button>
              </form>
            <form className="form-confirm-button-v2" action="./input.html"><button type="submit">修正する</button></form>
        </div>
    </div>
    // <Container fluid>
    //   <Row>
    //     <Col>
    //       <h2 className="pt-5 text-center">{t("attendanceConfirm.title")}</h2>
    //     </Col>
    //   </Row>
    //   <AttendanceConfirmContent user={props.user}/>
    //   <Row className="py-3">
    //     <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //       <SubmitButton
    //         buttonSize="lg"
    //         buttonText={t("attendanceConfirm.register")}
    //         isLoading={isLoading}
    //         onClick={handleRegister}/>
    //     </Col>
    //   </Row>
    //   <Row className="pb-5">
    //     <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //       <Button
    //         type="button"
    //         variant="outline-info"
    //         size="lg"
    //         disabled={isLoading}
    //         onClick={props.onBackButtonClicked}
    //       >{t("attendanceConfirm.back")}
    //       </Button>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

interface IProps {
  user: User;
  onBackButtonClicked: () => void;
  onSaveSuccess: (user: User) => void;
  onSaveError: (err: Error) => void;
  onSaveComplete: () => void;
}

export default AttendanceConfirm;