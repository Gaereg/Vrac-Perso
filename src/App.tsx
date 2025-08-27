import Home from "@pages/Home/Home"
import Nav from "@components/Nav/Nav"
import Pomodoro from "@components/Pomodoro/Pomodoro"
import Workspaces from "@pages/Workspaces/Workspaces"
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import "./global.css"
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <BrowserRouter>
          <header>
            <Nav />
            <Pomodoro />
          </header>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="workspaces" element={<Workspaces />} />
          </Routes>
        </BrowserRouter>
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}

export default App
