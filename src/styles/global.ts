import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, input, button, textarea {
        font: 400 16px 'Roboto', sans-serif;
    }

    body {
        background: #eaeff1;
    }

    :root {
        --backgroundColor: #835afd;
    }
`