import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto:400,700', 'sans-serif'],
  },
});

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%
  }

  body {
    -webkit-font-smoothing: antialised;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

`;
