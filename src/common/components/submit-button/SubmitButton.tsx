import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTranslation } from "react-i18next";

function SubmitButton(props: IProps) {
  const { t } = useTranslation();

  if (props.isLoading) {
    return (
    <Button variant="outline-info" size={props.buttonSize} disabled>
      <Spinner
        size={props.spinnerSize}
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
        className="align-middle"
      />
      <span className="sr-only">{t("common.button.loading")}</span>
    </Button>
    );
  } else {
    return (
      <Button
        type="button"
        disabled={props.disabled}
        size={props.buttonSize}
        variant="outline-info"
        onClick={props.onClick}
      >{props.buttonText}
      </Button>
    );
  }
}

interface IProps {
  disabled?: boolean;
  buttonText: string;
  spinnerSize?: "sm";
  buttonSize?: "sm" | "lg";
  isLoading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default SubmitButton;