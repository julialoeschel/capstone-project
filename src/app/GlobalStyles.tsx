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
  color: var( --color-green-700);
    background-color: var( --color-green-100)
}
:root {
  --color-green-100: #f6f5f2;
  --color-green-500: #d1e1db;
  --color-green-700: #2b5113;
  --color-gold: #ceb372;
  --color-yellow: #ffe4a0;
  --color-choral: #f47851;
  --box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

code {
  font-family: monospace, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}


& .mapboxgl-popup {
  max-width: 100px;
}

& .mapboxgl-popup-content {
  text-align: center;
  font-family: monospace, Menlo, Monaco, Consolas, 'Courier New',
    monospace
  font-weight: lighter;
  background-color: var(--color-green-100);
  border: solid 3px var(--color-gold);
  border-radius: 1em;
  padding: 1em;
} 

& .mapboxgl-popup-content h3 {
    padding: 0;
    margin: 0;
  }

  & .mapboxgl-popup-content p {
    padding: 0;
    margin: 0;
  }

 & .mapboxgl-popup-close-button {
    display: none;
  }

`

export default GlobalStyles
