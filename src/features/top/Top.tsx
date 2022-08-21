import { useTranslation } from "react-i18next";
import './Top.scss';

function Top() {
  const { t } = useTranslation();
  return (
    <div className="top-back-ground top-back-ground-adjust">
      <h1 className="title title-adjust app-font-family">{t("top.title")}</h1>
    </div>
  );
}

export default Top;