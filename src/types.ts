export interface ICurrency {
  symbol: string;
  name: string;
}

export interface IState {
  currencies: {
    list: ICurrency[];
    first: ICurrency;
    firstAmount: number;
    second: ICurrency;
    secondAmount: number | string;
  };
  error: {
    error: string;
  };
}

export interface IProps {
  currencies: ICurrency[];
  setCurrencies: Function;

  error: string;
  setError: Function;

  firstCurrency: ICurrency;
  secondCurrency: ICurrency;

  firstCurrencyAmount: number;
  secondCurrencyAmount: number | string;

  setFirstCurrency: Function;
  setSecondCurrency: Function;

  setFirstCurrencyAmount: Function;
  setSecondCurrencyAmount: Function;
}