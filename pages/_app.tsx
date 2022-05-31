import * as React from 'react';
import {AppProps} from 'next/app';
import {CurrencyContext} from '@utils/CurrencyContext';

import '@styles/index.css';
import {Header} from '@components/Header';
import {Currencies} from '@interfaces/Currency';

function MyApp({Component, pageProps}: AppProps) {
  const [currency, setCurrency] = React.useState(Currencies.UYU);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      <Component {...pageProps} header={<Header />} />
    </CurrencyContext.Provider>
  );
}

export default MyApp;
