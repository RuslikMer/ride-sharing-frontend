import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControl, Heading } from '@chakra-ui/react';
import SelectComponent from 'react-select';
import DatePicker from 'react-datepicker';
import { postRequest } from '../utils/api';
import SelectCountry from './SelectCountry';
import SelectCity from './SelectCity';
import LookingFor from './LookingFor';
import DepartureDate from './DepartureDate';
import DaysCount from './DaysCount';
import PaymentOption from './PaymentOption';
import Description from './Description';
import 'react-datepicker/dist/react-datepicker.css';

const cities = {
  ru: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
  us: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго'],
  de: ['Берлин', 'Мюнхен', 'Франкфурт'],
  fr: ['Париж', 'Марсель', 'Лион'],
  it: ['Рим', 'Милан', 'Венеция'],
};

export default function CreateAdForm() {
  const [formData, setFormData] = useState({
    lookingFor: null,
    departureCountry: null,
    departureCity: '',
    destinationCountry: null,
    destinationCity: '',
    departureDate: new Date(),
    isAlreadyOnVacation: false,
    daysCount: 0,
    paymentOption: '',
    description: '',
  });

  const [departureCityOptions, setDepartureCityOptions] = useState([]);
  const [destinationCityOptions, setDestinationCityOptions] = useState([]);

  useEffect(() => {
    if (formData.departureCountry) {
      setDepartureCityOptions(cities[formData.departureCountry.value] || []);
      if (!formData.departureCity) {
        setFormData((prevState) => ({
          ...prevState,
          departureCity: cities[formData.departureCountry.value]?.[0] || '',
        }));
      }
    } else {
      setDepartureCityOptions([]);
      setFormData((prevState) => ({
        ...prevState,
        departureCity: '',
      }));
    }
  }, [formData.departureCountry]);

  useEffect(() => {
    if (formData.destinationCountry) {
      setDestinationCityOptions(cities[formData.destinationCountry.value] || []);
      setFormData((prevState) => ({
        ...prevState,
        destinationCity: '',
      }));
    } else {
      setDestinationCityOptions([]);
      setFormData((prevState) => ({
        ...prevState,
        destinationCity: '',
      }));
    }
  }, [formData.destinationCountry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'daysCount' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      isAlreadyOnVacation: !formData.isAlreadyOnVacation,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postRequest('/ads', {
        lookingFor: formData.lookingFor?.value,
        departureCountry: formData.departureCountry?.value,
        departureCity: formData.departureCity,
        destinationCountry: formData.destinationCountry?.value,
        destinationCity: formData.destinationCity,
        departureDate: formData.departureDate.getTime(),
        isAlreadyOnVacation: formData.isAlreadyOnVacation,
        daysCount: formData.daysCount,
        paymentOption: formData.paymentOption,
        description: formData.description,
      });

      if (response.status === 201) {
        alert('Объявление успешно создано!');
      }
    } catch (error) {
      console.error('Ошибка при создании объявления:', error);
      alert('Произошла ошибка при создании объявления.');
    }
  };

  return (
    <Box maxWidth="600px" margin="0 auto" padding="4" backgroundColor="#f9f9f9" borderRadius="8px" boxShadow="md">
      <Heading as="h2" size="lg" marginBottom="4">Создать объявление</Heading>
      <form onSubmit={handleSubmit}>
        <LookingFor formData={formData} setFormData={setFormData} />
        <SelectCountry formData={formData} setFormData={setFormData} setDepartureCityOptions={setDepartureCityOptions} />
        <SelectCity
          label="Город отправления"
          options={departureCityOptions}
          value={formData.departureCity}
          onChange={(value) => setFormData({ ...formData, departureCity: value })}
          isDisabled={!formData.departureCountry}
        />
        <SelectCountry
          formData={formData}
          setFormData={setFormData}
          setDestinationCityOptions={setDestinationCityOptions}
          isDestination
        />
        <SelectCity
          label="Город назначения"
          options={destinationCityOptions}
          value={formData.destinationCity}
          onChange={(value) => setFormData({ ...formData, destinationCity: value })}
          isDisabled={!formData.destinationCountry}
        />
        <DepartureDate
          selectedDate={formData.departureDate}
          handleDateChange={(date) => setFormData({ ...formData, departureDate: date })}
          isAlreadyOnVacation={formData.isAlreadyOnVacation}
        />
        <Checkbox
          isChecked={formData.isAlreadyOnVacation}
          onChange={handleCheckboxChange}
          marginBottom="4"
        >
          Я уже в отпуске
        </Checkbox>
        <DaysCount value={formData.daysCount} handleInputChange={handleInputChange} />
        <PaymentOption value={formData.paymentOption} handleInputChange={handleInputChange} />
        <Description value={formData.description} handleInputChange={handleInputChange} />
        <Button type="submit" colorScheme="teal" width="full">
          Создать объявление
        </Button>
      </form>
    </Box>
  );
}