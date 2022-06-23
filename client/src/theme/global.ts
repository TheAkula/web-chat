import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: OpenSans;
    src: url('./fonts/OpenSans-Regular.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: OpenSans;
    src: url('./fonts/OpenSans-Bold.ttf');
    font-weight: 700;
  }
  @font-face {
    font-family: OpenSans;
    src: url('./fonts/OpenSans-Medium.ttf');
    font-weight: 500;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: OpenSans, sans-serif;
  }
`;
