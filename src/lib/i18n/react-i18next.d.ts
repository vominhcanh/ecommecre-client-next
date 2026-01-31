import 'i18next';

// react-i18next versions higher than 11.11.0
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
