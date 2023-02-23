import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      dark: '#000',
      light: '#fff',
    },
    primary: {
      main: '#086D93',
    },
    secondary: {
      main: '#505050',
    },
    light: {
      main: '#fff',
    },
    dark: {
      main: '#000',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
