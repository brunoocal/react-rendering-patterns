import * as React from 'react';
import {AppProps} from 'next/app';

import '@styles/index.css';
import {Header} from '@components/Header';

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} header={<Header />} />;
}

export default MyApp;
