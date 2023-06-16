import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import Routes from './Routes';



function App() {
  let theme = createTheme({
    palette: {
      primary: {
         main: '#51868A',
      },
      secondary: {
        main: '#7bc54c',
      },
      success:{
        main:'#616e80'
      }
    },
      typography: {
        fontFamily: [
          'TheQueen-Regular',
        ].join(','),
      },
    
  });

  return (
    <ThemeProvider theme={theme}>
      <Router slashType='slash'>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;

