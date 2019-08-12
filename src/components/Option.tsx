import React from 'react';

import { ICurrency } from '../types';

interface Props {
  currency: ICurrency
}

export default (props: Props) => {
  return (
    <option value={props.currency.symbol}>{props.currency.name}</option>
  );
}