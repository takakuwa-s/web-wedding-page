import { Link } from "react-router-dom";

function AttendanceComplete(props: IProps) {
  return (
    <div className="form-wrap">
      <div className="form-wrap__inner">
        {props.err ? (
          <>
            <h1 className="form-heading">エラー</h1>
            <div className="form-finish-button">
              <Link to="/">TOPへ戻る</Link>
            </div>
          </>
        ) : (
          <>
          <div className="form-image"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fform_head03.jpg?alt=media&token=f3d2633d-1744-433c-b402-d2c9a6e3544c" alt="" /></div>
          <div className="form-indicator">
            <div className="form-indicator__item">入力</div>
            <div className="form-indicator__item">確認</div>
            <div className="form-indicator__item is-current">完了</div>
          </div>
            <h1 className="form-heading">送信完了しました</h1>
            <p className="form-text">回答の送信が完了しました。<br />ご回答ありがとうございました。</p>
            <div className="form-finish-button">
              <Link to="/">TOPへ戻る</Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

interface IProps {
  err?: Error;
}

export default AttendanceComplete;