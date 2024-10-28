import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import SelectComponent from 'react-select';

const paymentOptions = [
  { value: 'cash', label: 'Наличными' },
  { value: 'card', label: 'Картой' },
  { value: 'crypto', label: 'Криптовалютой' },
];

const PaymentOption = ({ value, handleInputChange }) => (
  <FormControl marginBottom="4">
    <FormLabel htmlFor="paymentOption">Способ оплаты</FormLabel>
    <SelectComponent
      id="paymentOption"
      options={paymentOptions}
      value={paymentOptions.find((option) => option.value === value) || null}
      onChange={(selectedOption) => handleInputChange({ target: { name: 'paymentOption', value: selectedOption.value } })}
      placeholder="Выберите способ оплаты"
    />
  </FormControl>
);

export default PaymentOption;