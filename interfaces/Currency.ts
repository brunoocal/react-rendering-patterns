export enum Currencies {
  AUD = 'AUD',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  CNY = 'CNY',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  MXN = 'MXN',
  NOK = 'NOK',
  RUB = 'RUB',
  SEK = 'SEK',
  USD = 'USD',
  UYU = 'UYU',
}

export type CurrencyFlagRecord = {
  [key in Currencies]: string;
};

export const CurrencyFlag: CurrencyFlagRecord = Object.keys(Currencies).reduce(
  (acc, key) => {
    acc[key] = `/flags/${key}.png`;
    return acc;
  },
  {} as CurrencyFlagRecord
);

export enum CurrencyValueRelativeToUSD {
  AUD = 0.72,
  BRL = 0.21,
  CAD = 0.76,
  CHF = 1.04,
  CNY = 0.15,
  EUR = 1.07,
  GBP = 1.26,
  JPY = 0.0079,
  MXN = 0.051,
  NOK = 0.11,
  RUB = 0.015,
  SEK = 0.1,
  USD = 1,
  UYU = 0.025,
}

export const price = (
  usdQuantity: number | string,
  otherCurrency: Exclude<keyof typeof Currencies, 'USD'>
) => {
  if (typeof usdQuantity === 'string') {
    try {
      usdQuantity = parseFloat(usdQuantity);
    } catch (e) {
      usdQuantity = 0;
    }
  }

  if (usdQuantity === 0) return 0;

  const value = usdQuantity / CurrencyValueRelativeToUSD[otherCurrency];

  return value.toFixed(2);
};
