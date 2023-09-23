import { useTranslation } from "react-i18next";
import { saveUser } from "../../common/utils/userApiCall";
import { User } from "../../common/dto/user";
import { useState } from "react";

function AttendanceConfirm(props: IProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    saveUser(
      props.user,
      props.onSaveSuccess,
      props.onSaveError,
      props.onSaveComplete,
    );
  };

  return (
    <div className="form-wrap">
        <div className="form-wrap__inner">
          <div className="form-image"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fform_head02.jpg?alt=media&token=8a59549b-aae3-4f6b-a7f2-fd34d2b78b27" alt=""/></div>
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
                  <td>{props.user.name}</td>
                </tr>
                <tr>
                  <th>ふりがな</th>
                  <td>{props.user.nameKana}</td>
                </tr>
                <tr>
                  <th>出欠</th>
                  <td>{props.user.isAdmin ? "ご出席" : "ご欠席"}</td>
                </tr>
                <tr>
                  <th>新郎新婦との関係性</th>
                  <td>{t(`attendance.guestType.${props.user.guestType.toLowerCase()}`)}</td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>{props.user.postalCode}</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>{props.user.address}</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>{props.user.email}</td>
                </tr>
                <tr>
                  <th>アレルギーや苦手な食材</th>
                  <td>{props.user.allergy}</td>
                </tr>
                <tr>
                  <th>お連れ様追加</th>
                  <td>{props.user.companions[0].name}</td>
                  <td>{props.user.companions[0].allergy}</td>
                  <td>{props.user.companions[1].name}</td>
                  <td>{props.user.companions[1].allergy}</td>
                </tr>
                <tr>
                  <th>メッセージ</th>
                  <td>{props.user.message}</td>
                </tr>
              </tbody>
            </table>
            <form className="form-confirm-button" action="./finish.html">
              <button type="button" disabled={isLoading} onClick={handleRegister}>送信する</button>
            </form>
            <form className="form-confirm-button-v2" action="./input.html">
              <button type="button" disabled={isLoading} onClick={props.onBackButtonClicked}>修正する</button>
            </form>
        </div>
    </div>
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