import { combineReducers } from 'redux'
import {
  SET_CURRENCIES,
  SET_SECOND_CURRENCY_AMOUNT,
  SET_ERROR,
  SET_FIRST_CURRENCY_AMOUNT,
  SET_FIRST_CURRENCY,
  SET_SECOND_CURRENCY,
} from './actions'

const initialErrorState = {
  error: '',
}

const initialCurrenciesState = {
  list: [],
  first: {
    symbol: 'btc',
    name: 'Bitcoin',
  },
  second: {
    symbol: 'eth',
    name: 'Ethereum',
  },
  firstAmount: 1,
  secondAmount: '',
}

function currenciesReducer (state = initialCurrenciesState, action: any) {
  switch (action.type) {
    case SET_CURRENCIES:
      state = {
        ...state, list: action.payload,
      }
      break
    case SET_FIRST_CURRENCY:
      state = {
        ...state, first: action.payload,
      }
      break
    case SET_SECOND_CURRENCY:
      state = {
        ...state, second: action.payload,
      }
      break
    case SET_FIRST_CURRENCY_AMOUNT:
      state = {
        ...state, firstAmount: action.payload,
      }
      break
    case SET_SECOND_CURRENCY_AMOUNT:
      state = {
        ...state, secondAmount: action.payload,
      }
      break
  }
  return state
}

function errorReducer (state = initialErrorState, action: any) {
  switch (action.type) {
    case SET_ERROR:
      state = {
        ...state, error: action.payload,
      }
      break
  }
  return state
}

const App = combineReducers({
  currencies: currenciesReducer,
  error: errorReducer,
})

export default App