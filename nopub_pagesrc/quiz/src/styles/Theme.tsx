const Theme = {
  whiteOne: "#FFFFFF",
  whiteTwo: "#F5F5F5",
  violet: "#4D5B9E",
  paleViolet: "#D6DBF5",
  veryPaleViolet: "#F5F7FB",
  red: "rgb(247, 217, 219)",
  paleRed: "rgba(247, 217, 219, 0.35)",
  green: "rgb(148, 215, 162)",
  paleGreen: "rgba(148, 215, 162, 0.35)",
  gold: "rgba(255, 176, 4, 0.25)",
  paleGold: "rgba(255, 176, 4, 0.15)",
  grayOne: "#777777",
  grayTwo: "#555555",
  grayThree: "rgb(0 0 0 / 0.025)",
  black: "#000000",
};

export default Theme;

export type ThemeProps = {
  theme: typeof Theme;
};
