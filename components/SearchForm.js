import { useState } from 'react';
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

function Dropdown({ options, selectedLabel, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={handleButtonClick}
      >
        {selectedLabel || placeholder}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchForm() {
  const [searchParams, setSearchParams] = useState({
    departureCountry: '',
    destinationCountry: '',
    lookingFor: '',
    date: null,
    isAlreadyOnVacation: false,
  });

  const handleSearchChange = (name, label) => {
    setSearchParams((prev) => ({ ...prev, [name]: label }));
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
    <div className={styles.searchFormContainer}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <Dropdown
          options={countryOptions}
          selectedLabel={searchParams.departureCountry}
          onSelect={(option) => handleSearchChange('departureCountry', option.label)}
          placeholder="Откуда едем"
        />
        <Dropdown
          options={countryOptions}
          selectedLabel={searchParams.destinationCountry}
          onSelect={(option) => handleSearchChange('destinationCountry', option.label)}
          placeholder="Куда едем"
        />
        <Dropdown
          options={lookingForOptions}
          selectedLabel={searchParams.lookingFor}
          onSelect={(option) => handleSearchChange('lookingFor', option.label)}
          placeholder="Тип попутчика"
        />
        <div className={styles.dateGroup}>
          <DatePicker
            selected={searchParams.date}
            onChange={handleDateChange}
            minDate={new Date()}
            disabled={searchParams.isAlreadyOnVacation}
            placeholderText="Когда"
            dateFormat="dd/MM/yyyy"
            className={styles.dateField}
            showYearDropdown
            showMonthDropdown
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={searchParams.isAlreadyOnVacation}
              onChange={handleCheckboxChange}
            />
            Уже отдыхаю
          </label>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isButtonDisabled}
        >
          Поиск
        </button>
      </form>
    </div>
  );
}