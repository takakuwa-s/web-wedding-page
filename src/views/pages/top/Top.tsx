import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import './Top.scss';

class Top extends React.Component<IProps, IState> {
  public render() {
    const { t } = this.props;
    return (
      <div className="top-back-ground">
        <h1 className="title">{t("top.title")}</h1>
      </div>
    );
  }
}

interface IProps extends WithTranslation {
}

interface IState {
}

export default withTranslation()(Top);