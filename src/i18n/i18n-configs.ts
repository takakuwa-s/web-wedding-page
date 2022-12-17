import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import jaJson from "./ja.json";
// import enJson from "./en.json";
// import liff from "@line/liff/dist/lib";

const resources = {
  ja: { translation: jaJson },
  // en: { translation: enJson },
};
let lang = 'ja';
// if (liff.getLanguage().startsWith('en')) {
//   lang = 'en';
// }

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;