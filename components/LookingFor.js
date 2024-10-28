import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import SelectComponent from 'react-select';

const lookingForOptions = [
  { value: 'offer', label: 'Предложить попутчика' },
  { value: 'search', label: 'Искать попутчика' },
];

const LookingFor = ({ formData, setFormData }) => {
  const handleChange = (selectedOption) => {
    setFormData({ ...formData, lookingFor: selectedOption });
  };

  return (
    <FormControl marginBottom="4">
      <FormLabel htmlFor="lookingFor">Что вы ищете?</FormLabel>
      <SelectComponent
        id="lookingFor"
        options={lookingForOptions}
        value={formData.lookingFor}
        onChange={handleChange}
        placeholder="Выберите вариант"
      />
    </FormControl>
  );
};

export default LookingFor;