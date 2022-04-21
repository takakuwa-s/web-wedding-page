import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import './GreetingMessage.scss';
import greeting from "./../../../resource/greeting.jpeg"
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

class GreetingMessage extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <div className="message-back-ground">
        <Container>
          <Row>
            <Col>
              <img className="greeting-image py-5" alt="greeting" src={greeting}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <pre className="content">{t("greeting-message.content")}</pre>
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

export default withTranslation()(GreetingMessage);