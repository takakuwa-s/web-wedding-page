import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTranslation } from "react-i18next";

function SubmitButton(props: IProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSubmitting(true);
    return props.onClick(e);
  }

  if (isSubmitting) {
    return (
    <Button variant={props.variant} size="lg" disabled>
      <Spinner
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
        size="lg"
        variant={props.variant}
        onClick={onClick}
      >{props.buttonText}
      </Button>
    );
  }
}

interface IProps {
  buttonText: string;
  variant: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default SubmitButton;