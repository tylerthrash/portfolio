import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#0466C8',
      main: '#0353A4',
      dark: '#023E7D',
      contrastText: '#F1F3F4',
    },
    secondary: {
      light: '#006466',
      main: '#065A60',
      dark: '#0B525B',
      contrastText: '#F1F3F4',
    },
    success: {
      light: '#70e000',
      main: '#38b000',
      dark: '#008000',
      contrastText: '#F1F3F4',
    },
    error: {
      light: '#D00000',
      main: '#9D0208',
      dark: '#6A040F',
      contrastText: '#F1F3F4',
    },
    warning: {
      light: '#FAA307',
      main: '#F48C06',
      dark: '#E85D04',
      contrastText: '#F1F3F4',
    },
    info: {
      light: '#84d2f6',
      main: '#59a5d8',
      dark: '#386fa4',
      contrastText: '#F1F3F4',
    },
  },
});

export default theme;
