import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
        box-sizing: border-box;
    }

    body {
  margin: 0;
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var( --color-dark-green);
    background-color: var( --color-background-light)
}
:root {
  --color-background-light: #f6f5f2;
  --color-background-dark: #d1e1db;
  --color-gold: #ceb372;
  --color-yellow: #ffe4a0;
  --color-choral: #f47851;
  --color-dark-green: #2b5113;



}

code {
  font-family: monospace, Menlo, Monaco, Consolas, 'Courier New',
    monospace;

}
    `

export default GlobalStyles
