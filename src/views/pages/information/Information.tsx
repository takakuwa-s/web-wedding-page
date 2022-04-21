import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { WithTranslation, withTranslation } from "react-i18next";
import './Information.scss';

class Information extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <div className="information-back-ground">
        <Container>
          <Row>
              <Col>
                <h2 className="pt-5">{t("information.title")}</h2>
              </Col>
            </Row>
          <Row>
            <Col>
              <p className="groom-bride-title">{t("information.venue")}</p>
              <p className="groom-bride-title">{t("information.address")}</p>
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

export default withTranslation()(Information);