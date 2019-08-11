import React from 'react'

import { ICurrency } from '../types';

interface Props {
  currency: ICurrency
}

const Option: React.FC<Props> = (props) => {
  return (
    <option value={props.currency.symbol}>{props.currency.name}</option>
  )
}

export default Option