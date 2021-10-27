import {EmotionCache} from '@emotion/cache';
import {CacheProvider, ThemeProvider} from '@emotion/react';
import {createTheme, CssBaseline} from '@material-ui/core';
import type {AppProps} from 'next/app';
import {useMemo} from 'react';
import {NextSeo} from 'next-seo';

import useAuth from '../helpers/useAuth';

import createEmotionCache from '../helpers/createEmotionCache';
import Layout from '../components/Layout';

import '../styles.css';

export interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: ExtendedAppProps) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = false;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  // Ensure user is logged in
  const {isAuthed, message} = useAuth();

  if (!isAuthed) {
    return <>{message}</>;
  }

  // Else, display the page
  return (
    <>
      <NextSeo
        title="To-Do List | GDSC UoP"
        description="A GDSC University of Portsmouth application."
        additionalLinkTags={[
          {rel: 'icon', href: '/favicon.png'},
          {rel: 'apple-touch-icon', href: '/favicon-180.png', sizes: '180x180'},
        ]}
        noindex
      />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
