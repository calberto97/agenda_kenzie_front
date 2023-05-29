import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
    --color-blue-900: #0d47a1;
    --color-blue-800: #1565c0;
    --color-blue-700: #1976d2;
    --color-blue-600: #1e88e5;
    --color-blue-500: #2196f3;
    --color-blue-400: #42a5f5;
    --color-blue-300: #64b5f6;
    --color-blue-200: #90caf9;
    --color-blue-100: #bbdefb;
    --color-gray-900: #212121;
    --color-gray-800: #424242;
    --color-gray-700: #616161;
    --color-gray-600: #757575;
    --color-gray-500: #9e9e9e;
    --color-gray-400: #bdbdbd;
    --color-gray-300: #e0e0e0;
    --color-gray-200: #eeeeee;
    --color-gray-100: #f5f5f5;

    --space-cadet: #22223bff;
    --ultra-violet: #4a4e69ff;
    --rose-quartz: #9a8c98ff;
    --pale-dogwood: #c9ada7ff;
    --isabelline: #f2e9e4ff;

    font-size: 60%; 
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%; 
    }
  }
  
  * {
    margin:0;
    padding: 0;
    outline:0;
    box-sizing: border-box;
  }

  body,html{
    width: 100vw;
    height: 100vh;
  }

  body {
    font-family: 'Inter', sans-serif;

    /* background: var(--rose-quartz); */
    color: var(--space-cadet);
    -webkit-font-smoothing: antialiased;

    overflow-x: hidden;
  }

  body, input, button, textarea {
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong{
    
    font-weight: 500;
  }

  svg {
    cursor: pointer;
    transition: 1s ;
    :hover {
      transition: 0.5s;
      filter: drop-shadow(0 0 0.3rem white);
    }
  }

  button {
    transition: 1s;
  }

  input {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    transition: 1s;

    :hover {
      border-color: var(--pale-dogwood);
    }

    :focus,
    :focus-visible {
      outline: 4px auto var(--pale-dogwood);
    }

    ::placeholder {
      color: var(--ultra-violet);
      opacity: 0.5;
    }
    color: var(--space-cadet);
  }
  
  form > small {
    color: var(--pale-dogwood);
    font-weight: 500;
    font-size: 12px;
    margin-top: -8px;
  }

.Toastify__toast {
  background-color: var(--isabelline);
  color: var(--ultra-violet);

  svg {
    color: transparent;
  }
}

.Toastify__progress-bar {
  color: red !important;
  background-color: var(--pale-dogwood);
}

.Toastify__toast-icon {
  --toastify-icon-color-success: var(--pale-dogwood);
  --toastify-icon-color-error: var(--pale-dogwood);
}

`;
