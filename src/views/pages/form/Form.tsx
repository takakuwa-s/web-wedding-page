import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { WithTranslation, withTranslation } from "react-i18next";
import './Form.scss';

class Form extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <div className="form-back-ground">
        <Container>
          <Row>
              <Col>
                <h2 className="pt-5">{t("form.title")}</h2>
              </Col>
            </Row>
          <Row>
            <Col>
              <textarea />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

interface IProps extends WithTranslation {
}

interface IState {
}

export default withTranslation()(Form);