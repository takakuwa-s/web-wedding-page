import { useTranslation } from "react-i18next";
import './Home.scss';

function Top() {
  const { t } = useTranslation();
  return (
    <div className="top-back-ground top-back-ground-adjust">
      <h1 className="title title-adjust">{t("top.title")}</h1>
    </div>
  );
}

export default Top;