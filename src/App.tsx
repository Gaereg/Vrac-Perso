import Login from "@pages/Login/Login";
import Nav from "@components/Nav/Nav";
import Pomodoro from "@components/Pomodoro/Pomodoro";
import Workspaces from "@pages/Workspaces/Workspaces";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import styles from "./App.module.css";
import theme from "./theme";
import { useEffect, useState } from "react";
import { supabase } from "@clientSupabase";

function App() {
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      const resClaim = await supabase.auth.getClaims();

      if (resClaim.data?.claims.role === "authenticated") {
        setIsLog(true);
      }
      setIsLoading(false);
    };

    getSession();
  });

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        {!isLoading && (
          <BrowserRouter>
            <ProtectedRoute isLog={isLog}>
              <header>
                <Nav />
                <Pomodoro />
              </header>
            </ProtectedRoute>
            <Box className={styles.container}>
              <Routes>
                <Route
                  path="*"
                  element={isLog ? <Workspaces /> : <Login setIsLog={setIsLog} />}
                />
                
                <Route
                  path="/workspaces"
                  element={
                    <ProtectedRoute isLog={isLog}>
                      <Workspaces />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Box>
          </BrowserRouter>
        )}
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

const ProtectedRoute = ({
  isLog,
  children,
}: {
  isLog: boolean;
  children: React.ReactNode;
}) => {
  if (!isLog) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default App;
