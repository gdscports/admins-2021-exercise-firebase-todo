import {EmotionCache} from '@emotion/cache';
import {CacheProvider, ThemeProvider} from '@emotion/react';
import {createTheme, CssBaseline, useMediaQuery} from '@material-ui/core';
import type {AppProps} from 'next/app';
import {useMemo} from 'react';
import {NextSeo} from 'next-seo';

import createEmotionCache from '../helpers/createEmotionCache';
import Layout from '../components/Layout';

export interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: ExtendedAppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <NextSeo
        title="GDSC University of Portsmouth"
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
