import React from 'react'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import '../styles/globals.css'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: 'rgb(132,168,236)'
      // main: 'rgb(255,65,55)',
    },
    secondary: {
      // This is green.A700 as hex.
      main: 'rgb(234,71,73)'
    }
  }
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
