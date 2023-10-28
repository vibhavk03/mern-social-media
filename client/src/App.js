import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import Navbar from 'scenes/navbar';
import ProfilePage from 'scenes/profilePage';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  /* use memo will cache the value, it will only refresh when the mode value changes */
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* css reset for material ui */}
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <LoginPage />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <LoginPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
