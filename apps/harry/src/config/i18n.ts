import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;