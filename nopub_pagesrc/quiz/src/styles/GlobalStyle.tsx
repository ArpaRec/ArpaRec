import { createGlobalStyle } from "styled-components";
import type { ThemeProps } from "./Theme";

const GlobalStyle = createGlobalStyle<ThemeProps>`

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: Roboto, sans-serif;
    line-height: 150%;
  }

  body {
    background: ${(props) => props.theme.veryPaleViolet};
    overflow-x: hidden;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${(props) => props.theme.veryPaleViolet};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.grayTwo};
      border-radius: 4px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.grayOne};
    }
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 32px auto;
  }

`;

export default GlobalStyle;
