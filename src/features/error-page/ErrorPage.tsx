import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { error } from "../../common/dto/error";

function ErrorPage(props: {err: error}) {
  const { t } = useTranslation();
  console.log(props.err);
  return (
    <div className="form-wrap">
      <div className="form-wrap__inner">
        <h1 className="form-heading">!エラー</h1>
      </div>
    </div>

  );
}

export default ErrorPage;
