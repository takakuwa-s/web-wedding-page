import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

function FormSelect(props: IProps) {
  return (
    <Form.Select onChange={props.onSelect} value={props.value} >
      {props.options.map((o, i) => (
        <option key={i} value={o.value}>{o.label}</option>
      ))}
    </Form.Select>
  );
}

interface IProps {
  value?: string;
  options: {value: string, label: string}[];
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default FormSelect;
