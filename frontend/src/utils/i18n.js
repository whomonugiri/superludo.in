import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import english from "./languages/english/data.json";
import hindi from "./languages/hindi/data.json";

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Passes i18n to React
  .init({
    resources: {
      english: { translation: english },
      hindi: { translation: hindi },
    },
    fallbackLng: "english", // Default language
    interpolation: { escapeValue: false }, // React already escapes by default
  });

export default i18n;
