import React from 'react'
import { ICurrency } from '../types'

import OptionComponent from './Option'

interface IProps {
  currencies: ICurrency[];
  readonly: boolean;
  currency: ICurrency;
  amount: number | string;
  setAmount: Function;
  setCurrency: Function;
  title: string;
  error?: string;
}

const CurrencySelect = (props: IProps) => {

  const findCurrencyBySymbol = (symbol: string) => {
    return props.currencies.filter((currency: ICurrency) => currency.symbol === symbol)[0]
  }

  const handleCurrency = (e: any) => {
    const currency = findCurrencyBySymbol(e.target.value)
    props.setCurrency(currency)
  }

  const handleInput = (e: any) => {
    if (!props.readonly) {
      props.setAmount(e.target.value)
    }
  }

  const selectContent = props.currencies.map((currency: ICurrency) => {
    return (<OptionComponent currency={currency} key={currency.symbol}/>)
  })

  let textError = null
  if (props.error && props.error.length > 0) {
    textError = (
      <p className="text-red-500 text-xs italic">{props.error}</p>
    )
  }

  return (
    <div className="md:w-1/2 w-full md:px-10">
      <div className="w-full">
        <h4 className="text-xl font-bold">{props.title}</h4>
      </div>

      <div className="flex flex-wrap">
        <div className="w-1/2">
          <input
            className="appearance-none block w-full bg-gray-200 border border-r-1 text-gray-700 py-2 px-3 mb-3 rounded-l leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name" type="text" placeholder="Any amount" value={props.amount}
            onChange={handleInput}
            readOnly={props.readonly}
          />
        </div>
        <div className="w-1/2">
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-l-1 text-gray-700 py-2 px-3 pr-8 rounded-r leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onChange={handleCurrency}
              value={props.currency.symbol}
            >
              {selectContent}
            </select>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full">
          {textError}
        </div>
      </div>
    </div>
  )
}

export default CurrencySelect