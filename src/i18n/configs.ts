import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import jaJson from "./ja.json";

const resources = {
  ja: { translation: jaJson },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ja",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;