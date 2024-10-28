import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import SelectComponent from 'react-select';

// Список стран и городов
const countryOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'us', label: 'США' },
  { value: 'de', label: 'Германия' },
  { value: 'fr', label: 'Франция' },
  { value: 'it', label: 'Италия' },
];

const SelectCountry = ({ formData, setFormData, setCityOptions, isDestination = false }) => {
  const handleCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setFormData((prevState) => ({
      ...prevState,
      [isDestination ? 'destinationCountry' : 'departureCountry']: selectedOption,
      [isDestination ? 'destinationCity' : 'departureCity']: '',
    }));
    setCityOptions(selectedCountry);
  };

  return (
    <FormControl marginBottom="4">
      <FormLabel htmlFor={isDestination ? 'destinationCountry' : 'departureCountry'}>
        {isDestination ? 'Страна назначения' : 'Страна отправления'}
      </FormLabel>
      <SelectComponent
        name={isDestination ? 'destinationCountry' : 'departureCountry'}
        options={countryOptions}
        value={isDestination ? formData.destinationCountry : formData.departureCountry}
        onChange={handleCountryChange}
        placeholder={`Выберите страну ${isDestination ? 'назначения' : 'отправления'}`}
      />
    </FormControl>
  );
};

export default SelectCountry;