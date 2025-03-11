import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  )
}


