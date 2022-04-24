import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import './AttendanceFormCheck.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { User } from "../../../dto/user";

class AttendanceFormCheck extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <Container fluid className="form-check-back-ground">
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t("form.title")}</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={3} xl={{ span: 2, offset: 1 }}>
            <p className="text-center">{t("form.name.label")}</p>
          </Col>
          <Col sm={8}>
            <p className="text-center">{this.props.user.familyName + this.props.user.firstName}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

interface IProps extends WithTranslation {
  user: User;
}

interface IState {
}

export default withTranslation()(AttendanceFormCheck);