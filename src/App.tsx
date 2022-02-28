import { createContext, useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header/Header';
import { authMe, getUserById } from './store/auth/authThunk';
import { getUsersCollections } from './store/collections/collectionsThunk';
import { ItemPage } from './components/Main/Item/ItemPage';
import { NoAccessPage } from './components/Routers/NoAccessPage';
import { PrivateRoute } from './components/Routers/PrivateRoute';
import { ItemForm } from './components/Form/ItemForm';
import { SignIn } from './components/Login/SignIn';
import { UserPublications } from './components/Main/UserPublications';
import { Main } from './components/Main/Main';

export const ColorModeContext = createContext({
  toggleColorMode: () => {
  }
});


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
    dispatch(getUsersCollections());
    // dispatch(getUsersCollections());
  }, []);

  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
  );

  const theme = useMemo(
      () =>
          createTheme({
            palette: {
              mode,
            },
          }),
      [mode],
  );

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/book/:bookId" element={<ItemPage/>}/>
            <Route path="/user:id/publications" element={<PrivateRoute children={UserPublications}/>}/>
            <Route path="/addBookForm" element={<PrivateRoute children={ItemForm}/>}/>
            <Route path="/redirect" element={<PrivateRoute children={NoAccessPage}/>}/>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
