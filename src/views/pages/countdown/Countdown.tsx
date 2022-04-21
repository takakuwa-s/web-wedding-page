import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import './Countdown.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

class Countdown extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <div className="cowntdown-back-ground">
        <Container>
          <Row>
              <Col>
                <h2 className="pt-5">{t("cowntdown.title")}</h2>
              </Col>
            </Row>
          <Row>
            <Col>
              <p>To 2023.03.19</p>
              <p>332days and 14:23:34</p>
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

export default withTranslation()(Countdown);