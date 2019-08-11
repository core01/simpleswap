/*
 * action types
 */
import { ICurrency } from '../types'

export const SET_CURRENCIES = 'SET_CURRENCIES'
export const SET_FIRST_CURRENCY = 'SET_FIRST_CURRENCY'
export const SET_SECOND_CURRENCY = 'SET_SECOND_CURRENCY'
export const SET_FIRST_CURRENCY_AMOUNT = 'SET_FIRST_CURRENCY_AMOUNT'
export const SET_SECOND_CURRENCY_AMOUNT = 'SET_SECOND_CURRENCY_AMOUNT'
export const SET_ERROR = 'SET_ERROR'

/*
 * action creators
 */

export function setCurrencies (currencies: ICurrency[]) {
  return { type: SET_CURRENCIES, payload: currencies }
}

export function setFirstCurrency (currency: ICurrency){
  return {type: SET_FIRST_CURRENCY, payload: currency};
}
export function setFirstCurrencyAmount (amount: number | string) {
  return { type: SET_FIRST_CURRENCY_AMOUNT, payload: amount }
}

export function setSecondCurrency (currency: ICurrency){
  return {type: SET_SECOND_CURRENCY, payload: currency};
}
export function setSecondCurrencyAmount (amount: number | string) {
  return { type: SET_SECOND_CURRENCY_AMOUNT, payload: amount }
}

export function setError (error: string) {
  return { type: SET_ERROR, payload: error }
}