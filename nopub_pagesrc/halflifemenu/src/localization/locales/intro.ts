import convertToI18nFormat from "../transformToI18nFormat";

const intro = convertToI18nFormat({
  description: {
    en: 'Press go to start',
    ru: 'Нажмите "Начать", чтобы увидеть начальный экран для',
  },
  start: {
    en: "Go",
    ru: "Начать",
  },
});

export default intro;
