import convertToI18nFormat from "../transformToI18nFormat";

const newGame = convertToI18nFormat({
  modalName: {
    en: "Media",
    ru: "Новая игра",
  },
  chapter: {
    en: "Media",
    ru: "Глава",
  },
  more: {
    en: "More",
    ru: "Ещё",
  },
  startNewGame: {
    en: "Launch Media",
    ru: "Начать новую игру",
  },
  cancel: {
    en: "Cancel",
    ru: "Отмена",
  },
});

export default newGame;
