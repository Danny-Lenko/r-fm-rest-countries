import { Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, ToggleColorMode } from './library/utilities/ToggleColorMode'
import AppBar from './library/common/components/AppBar/AppBar';

function App() {
  const myColorMode = ToggleColorMode()
  myColorMode.theme.shadows.push("0px 3px 1px -2px rgba(0,0,0,0.01),0px 2px 2px 0px rgba(0,0,0,0.014),0px 1px 5px 0px rgba(0,0,0,0.12)")

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
