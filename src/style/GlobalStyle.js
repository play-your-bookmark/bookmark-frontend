import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;
