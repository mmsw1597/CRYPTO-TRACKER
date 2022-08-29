import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    <ReactQueryDevtools initialIsOpen = {true}/>
    </>
  );
}

export default App;
