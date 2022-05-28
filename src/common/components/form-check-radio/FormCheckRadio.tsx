import Form from "react-bootstrap/esm/Form";
import FormCheck from "react-bootstrap/esm/FormCheck";

function FormCheckRadio(props: IProps) {
  return (
    <>
      {props.checks.map((c, i) => (
        <div key={i} className="d-inline-flex justify-content-start align-items-center">
          <Form.Check
            type="radio"
            id={`${props.name}-${i}`}
            name={props.name}
            checked={c.checked}
            onChange={c.onChange} />
          <FormCheck.Label htmlFor={`${props.name}-${i}`}  className={`px-3 ${props.labelClassName}`}>{c.label}</FormCheck.Label>
        </div>
      ))}
    </>
  );
}

interface IProps {
  name: string;
  labelClassName?: string;
  checks: {label: string, checked: boolean, onChange: () => void}[];
}

export default FormCheckRadio;
