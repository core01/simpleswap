import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CurrencySelectComponent from './components/CurrencySelect'
import {
  setCurrencies,
  setError,
  setFirstCurrency,
  setFirstCurrencyAmount, setSecondCurrency,
  setSecondCurrencyAmount,
} from './store/actions'
import { ICurrency, IState, IProps } from './types'

const App: React.FC<IProps> = (props) => {

  const { setCurrencies, firstCurrency, secondCurrency, firstCurrencyAmount, setError, setSecondCurrencyAmount } = props

  useEffect(() => {
    axios.get('https://api.simpleswap.io/get_all_currencies')
      .then(response => {
        let currencies = response.data.sort((a: any, b: any) => a.name.localeCompare(b.name))

        setCurrencies(currencies)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setCurrencies])

  useEffect(() => {
    setError('')
    axios.get('https://api.simpleswap.io/get_min?currency_from=' + firstCurrency.symbol + '&currency_to=' + secondCurrency.symbol)
      .then(response => {
        if (response.data !== null) {
          const min = parseFloat(response.data)
          if (firstCurrencyAmount > min) {
            axios.get('https://api.simpleswap.io/get_estimated?currency_from=' + firstCurrency.symbol + '&currency_to=' + secondCurrency.symbol + '&amount=' + firstCurrencyAmount)
              .then(response => {
                if (response.data !== null) {
                  setSecondCurrencyAmount(response.data)
                } else {
                  setSecondCurrencyAmount('-')
                  setError('This pair is disabled now. Please try again later')
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            setSecondCurrencyAmount('-')
            setError('The minimum amount: ' + min)
          }
        } else {
          setSecondCurrencyAmount('-')
          setError('This pair is disabled now. Please try again later')
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [firstCurrency, secondCurrency, firstCurrencyAmount, setError, setSecondCurrencyAmount])

  return (
    <div className="App">
      <section className="px-2 lg:px-0 mt-16 sm:mt-32 flex w-full flex-col container mx-auto pb-16">

        <div className="w-full mb-10">
          <h2 className="leading-none font-bold text-2xl xs:text-2x1 md:text-5xl lg:6x1 uppercase">Crypto
            Exchange</h2>
        </div>

        <div className="flex">
          <CurrencySelectComponent
            title={'I want to sell'}
            currencies={props.currencies}
            amount={props.firstCurrencyAmount}
            currency={props.firstCurrency}
            setCurrency={props.setFirstCurrency}
            setAmount={props.setFirstCurrencyAmount}
            readonly={false}
          />
          <CurrencySelectComponent
            title={'I will receive'}
            currencies={props.currencies}
            amount={props.secondCurrencyAmount}
            currency={props.secondCurrency}
            setCurrency={props.setSecondCurrency}
            setAmount={props.setSecondCurrencyAmount}
            error={props.error}
            readonly={true}
          />
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    currencies: state.currencies.list,
    error: state.error.error,
    firstCurrency: state.currencies.first,
    secondCurrency: state.currencies.second,
    firstCurrencyAmount: state.currencies.firstAmount,
    secondCurrencyAmount: state.currencies.secondAmount,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setCurrencies: (currencies: ICurrency[]) => {
      dispatch(setCurrencies(currencies))
    },
    setError: (error: string) => {
      dispatch(setError(error))
    },
    setFirstCurrency: (currency: ICurrency) => {
      dispatch(setFirstCurrency(currency))
    },
    setSecondCurrency: (currency: ICurrency) => {
      dispatch(setSecondCurrency(currency))
    },
    setFirstCurrencyAmount: (amount: number) => {
      dispatch(setFirstCurrencyAmount(amount))
    },
    setSecondCurrencyAmount: (amount: number) => {
      dispatch(setSecondCurrencyAmount(amount))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
