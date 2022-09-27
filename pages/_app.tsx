import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import theme from '../types/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Layout } from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>{pageProps.pageTitle ?? 'Welcome to Tylers Playground!'}</title>
      </Head>

      <ThemeProvider theme={theme}>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
