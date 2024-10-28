import React from 'react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

const Description = ({ value, handleInputChange }) => (
  <FormControl marginBottom="4">
    <FormLabel>Описание</FormLabel>
    <Textarea
      name="description"
      value={value}
      onChange={handleInputChange}
      placeholder="Введите описание объявления"
    />
  </FormControl>
);

export default Description;