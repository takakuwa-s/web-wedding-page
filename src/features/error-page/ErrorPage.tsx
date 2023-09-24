import { error } from "../../common/dto/error";

function ErrorPage(props: {err: error}) {
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
