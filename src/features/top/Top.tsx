import { useTranslation } from "react-i18next";
import './Top.scss';

function Top() {
  const { t } = useTranslation();
  return (
    <div className="top-back-ground">
      <h1 className="title">{t("top.title")}</h1>
    </div>
  );
}

export default Top;