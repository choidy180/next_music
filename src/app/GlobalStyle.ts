"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Chosunilbo_myungjo';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Chosunilbo_myungjo.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'BookkMyungjo-Bd';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/BookkMyungjo-Bd.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    * {
        position: relative;
        margin: 0;
        padding: 0;
    }
    body {
        margin: 0;
        padding: 0;
        position: relative;
    }
`;

export default GlobalStyle;