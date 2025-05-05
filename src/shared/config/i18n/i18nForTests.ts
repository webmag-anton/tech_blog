import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translations: {},
        about: {
          about_us: ['Test paragraph 1', 'Test paragraph 2']
        }
      }
    }
  })

export default i18n
