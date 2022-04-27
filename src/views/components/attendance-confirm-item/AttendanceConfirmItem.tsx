import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const AttendanceConfirmItem: React.VFC<IProps> = ({ as: CustomTag = "p", label, value}) => {
  return (
    <Row className="my-3">
      <Col xs={4} sm={{ span: 3, offset: 3 }} lg={{ span: 2, offset: 4 }} className="text-center">
        <span>{label}</span>
      </Col>
      <Col xs={8} sm={6}>
        <CustomTag>{value}</CustomTag>
      </Col>
    </Row>
  );
}

interface IProps {
  label: string;
  value: string;
  as?: React.ElementType;
}

export default AttendanceConfirmItem;