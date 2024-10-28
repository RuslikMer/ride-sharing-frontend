import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import SelectComponent from 'react-select';

const SelectCity = ({ label, options, value, onChange, isDisabled }) => {
  const optionsList = options.map((city) => ({ value: city, label: city }));

  return (
    <FormControl marginBottom="4">
      <FormLabel>{label}</FormLabel>
      <SelectComponent
        options={optionsList}
        value={value ? { value, label: value } : null}
        onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : '')}
        placeholder={`Выберите ${label.toLowerCase()}`}
        isDisabled={isDisabled}
      />
    </FormControl>
  );
};

export default SelectCity;