import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

const DepartureDate = ({ selectedDate, handleDateChange }) => (
  <FormControl marginBottom="4">
    <FormLabel>Дата отправления</FormLabel>
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Выберите дату"
      className="date-picker"
    />
  </FormControl>
);

export default DepartureDate;