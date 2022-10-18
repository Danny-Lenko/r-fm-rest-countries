import { Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, ToggleColorMode } from './library/utilities/ToggleColorMode'
import AppBar from './library/common/components/AppBar/AppBar';

function App() {
  const myColorMode = ToggleColorMode()

  return(
    <ThemeProvider theme = { myColorMode.theme } >
      <CssBaseline />

      <ColorModeContext.Provider value={myColorMode.colorMode}>
        <AppBar />
      </ColorModeContext.Provider>

      <Routes>
        {/* <Route path='/' element={<PostsList />} /> */}
      </Routes>

    </ThemeProvider >
  );
}

export default App;
