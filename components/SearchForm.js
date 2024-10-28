import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Select,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FaPlaneDeparture, FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/SearchForm.module.css';

const countryOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'us', label: 'США' },
  { value: 'de', label: 'Германия' },
  { value: 'fr', label: 'Франция' },
  { value: 'it', label: 'Италия' },
];

const lookingForOptions = [
  { value: 'companion', label: 'Попутчик' },
  { value: 'companion_female', label: 'Попутчицу' },
  { value: 'company', label: 'Компанию' },
];

export default function SearchForm() {
  const [searchParams, setSearchParams] = useState({
    departureCountry: '',
    destinationCountry: '',
    lookingFor: '',
    date: null,
    isAlreadyOnVacation: false,
  });

  const handleSearchChange = (name, value) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setSearchParams((prev) => ({ ...prev, date }));
  };

  const handleCheckboxChange = () => {
    setSearchParams((prev) => ({
      ...prev,
      isAlreadyOnVacation: !prev.isAlreadyOnVacation,
      date: prev.isAlreadyOnVacation ? prev.date : null,
    }));
  };

  const isButtonDisabled = !(
    searchParams.departureCountry ||
    searchParams.destinationCountry ||
    searchParams.lookingFor ||
    searchParams.date
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      window.location.href = `/search?departureCountry=${encodeURIComponent(searchParams.departureCountry)}&destinationCountry=${encodeURIComponent(searchParams.destinationCountry)}&lookingFor=${encodeURIComponent(searchParams.lookingFor)}&date=${searchParams.date?.toISOString()}&isAlreadyOnVacation=${searchParams.isAlreadyOnVacation}`;
    }
  };

  return (
    <Box className={styles.searchBox} padding="1rem" borderWidth="1px" borderRadius="8px" backgroundColor="#F7F8FA" boxShadow="sm">
      <form onSubmit={handleSearchSubmit}>
        <Flex justify="space-between" alignItems="center" wrap="wrap" gap="1rem">
          <FormControl className={styles.formControl}>
            <IconButton icon={<FaPlaneDeparture />} aria-label="Откуда едем" marginRight="0.5rem" />
            <Select
              value={searchParams.departureCountry}
              onChange={(e) => handleSearchChange('departureCountry', e.target.value)}
              placeholder="Откуда едем"
              className={styles.selectField}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.formControl}>
            <IconButton icon={<FaMapMarkerAlt />} aria-label="Куда едем" marginRight="0.5rem" />
            <Select
              value={searchParams.destinationCountry}
              onChange={(e) => handleSearchChange('destinationCountry', e.target.value)}
              placeholder="Куда едем"
              className={styles.selectField}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.formControl}>
            <IconButton icon={<FaUsers />} aria-label="Тип попутчика" marginRight="0.5rem" />
            <Select
              value={searchParams.lookingFor}
              onChange={(e) => handleSearchChange('lookingFor', e.target.value)}
              placeholder="Тип попутчика"
              className={styles.selectField}
            >
              {lookingForOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.formControl}>
            <IconButton icon={<FaCalendarAlt />} aria-label="Дата" marginRight="0.5rem" />
            <DatePicker
              selected={searchParams.date}
              onChange={handleDateChange}
              minDate={new Date()}
              disabled={searchParams.isAlreadyOnVacation}
              placeholderText="Когда"
              dateFormat="dd/MM/yyyy"
              className={styles.datePicker}
            />
          </FormControl>

          <Checkbox
            isChecked={searchParams.isAlreadyOnVacation}
            onChange={handleCheckboxChange}
            className={styles.formControl}
          >
            Уже отдыхаю
          </Checkbox>
        </Flex>

        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={isButtonDisabled}
          width="100%"
          marginTop="1rem"
        >
          Найти
        </Button>
      </form>
    </Box>
  );
}