import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const DaysCount = ({ value, handleInputChange }) => (
  <FormControl marginBottom="4">
    <FormLabel>Количество дней</FormLabel>
    <Input
      type="number"
      name="daysCount"
      value={value}
      onChange={handleInputChange}
      placeholder="Введите количество дней"
    />
  </FormControl>
);

export default DaysCount;