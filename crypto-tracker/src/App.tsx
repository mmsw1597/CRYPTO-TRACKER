import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from './theme';
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./routes/atoms";

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
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
    <ThemeProvider theme ={isDark ? darkTheme : lightTheme}>
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen = {true}/>
    </ThemeProvider>
    </>
  );
}

export default App;
