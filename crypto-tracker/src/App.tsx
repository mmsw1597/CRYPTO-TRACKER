import { createGlobalStyle } from "styled-components";
import Router from "./routes/Router";

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  *{
    box-sizing: border-box;
  }
`

function App() {
  return (
    <>
    <GlobalStyle/>
    <Router/>
    </>
  );
}

export default App;
