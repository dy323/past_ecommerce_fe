import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from 'utilities/localization/lang/en';
import zh from 'utilities/localization/lang/zh';
import ms from 'utilities/localization/lang/ms';
import th from 'utilities/localization/lang/th';
import vn from 'utilities/localization/lang/vn';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      ms: {
        translation: ms,
      },
      th: {
        translation: th,
      },
      vn: {
        translation: vn,
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
