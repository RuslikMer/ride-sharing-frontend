import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/CreateAdForm.module.css';

// Список стран и городов
const countryOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'us', label: 'США' },
  { value: 'de', label: 'Германия' },
  { value: 'fr', label: 'Франция' },
  { value: 'it', label: 'Италия' },
  // Добавьте другие страны по необходимости
];

const cities = {
  ru: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
  us: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго'],
  de: ['Берлин', 'Мюнхен', 'Франкфурт'],
  fr: ['Париж', 'Марсель', 'Лион'],
  it: ['Рим', 'Милан', 'Венеция'],
  // Добавьте другие города по необходимости
};

const lookingForOptions = [
  { value: 'companion', label: 'Попутчика' },
  { value: 'companion-female', label: 'Попутчицу' },
  { value: 'group', label: 'Компанию' },
];

export default function CreateAdForm() {
  const [formData, setFormData] = useState({
    lookingFor: null,
    departureCountry: null,
    departureCity: '',
    destinationCountry: null,
    destinationCity: '',
    departureDate: new Date(),
    isAlreadyOnVacation: false,
    daysCount: '',
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
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      isAlreadyOnVacation: !formData.isAlreadyOnVacation,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      departureDate: date,
    });
  };

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setFormData({
      ...formData,
      destinationCountry: selectedOption,
      destinationCity: '', // Сбрасываем город назначения при смене страны
    });
  
    // Обновляем список городов для выбранной страны
    setDestinationCityOptions(cities[selectedCountry] || []);
  };

  const handleDepartureCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setFormData({
      ...formData,
      departureCountry: selectedOption,
      departureCity: '', // Сбрасываем город отправления при смене страны
    });
  
    // Обновляем список городов для выбранной страны
    setDepartureCityOptions(cities[selectedCountry] || []);
  };

  const handleDepartureCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      departureCity: selectedOption ? selectedOption.value : '',
    });
  };

  const handleDestinationCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      destinationCity: selectedOption ? selectedOption.value : '',
    });
  };

  const handleLookingForChange = (selectedOption) => {
    setFormData({
      ...formData,
      lookingFor: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика отправки формы
  };

  // Формируем список опций для выбора городов
  const departureCityOptionsList = departureCityOptions.map((city) => ({ value: city, label: city }));
  const destinationCityOptionsList = destinationCityOptions.map((city) => ({ value: city, label: city }));

  return (
    <div className={styles.createAdFormContainer}>
      <h2 className={styles.title}>Создать объявление</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="lookingFor" className={styles.label}>Ищу</label>
        <Select
          name="lookingFor"
          options={lookingForOptions}
          value={formData.lookingFor}
          onChange={handleLookingForChange}
          placeholder="Выберите тип попутчика"
          className={styles.selectField}
        />

        <label htmlFor="departureCountry" className={styles.label}>Страна отправления</label>
        <Select
          name="departureCountry"
          options={countryOptions}
          value={formData.departureCountry}
          onChange={handleDepartureCountryChange}
          placeholder="Выберите страну отправления"
          className={styles.selectField}
        />

        <label htmlFor="departureCity" className={styles.label}>Город отправления</label>
        <Select
          name="departureCity"
          options={departureCityOptionsList}
          value={formData.departureCity ? { value: formData.departureCity, label: formData.departureCity } : null}
          onChange={handleDepartureCityChange}
          placeholder="Выберите город отправления"
          isDisabled={!formData.departureCountry}
          required
          className={styles.selectField}
        />

        <label htmlFor="destinationCountry" className={styles.label}>Страна назначения</label>
        <Select
          name="destinationCountry"
          options={countryOptions}
          value={formData.destinationCountry}
          onChange={handleCountryChange}
          placeholder="Выберите страну назначения"
          className={styles.selectField}
        />

        <label htmlFor="destinationCity" className={styles.label}>Город назначения</label>
        <Select
          name="destinationCity"
          options={destinationCityOptionsList}
          value={formData.destinationCity ? { value: formData.destinationCity, label: formData.destinationCity } : null}
          onChange={handleDestinationCityChange}
          placeholder="Введите город назначения (не обязательно)"
          isClearable
          isDisabled={!formData.destinationCountry}
          className={styles.selectField}
        />

        <label htmlFor="departureDate" className={styles.label}>Дата отправления</label>
        <DatePicker
          selected={formData.departureDate}
          onChange={handleDateChange}
          minDate={new Date()}
          disabled={formData.isAlreadyOnVacation}
          className={styles.inputField}
        />

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={formData.isAlreadyOnVacation}
            onChange={handleCheckboxChange}
          />
          <label>Уже отдыхаю</label>
        </div>

        <label htmlFor="daysCount" className={styles.label}>На сколько дней?</label>
        <input
          type="number"
          name="daysCount"
          value={formData.daysCount}
          onChange={handleInputChange}
          placeholder="Введите количество дней"
          className={styles.narrowInputField}
          required
        />

        <label htmlFor="paymentOption" className={styles.label}>Оплата тура</label>
        <select
          name="paymentOption"
          value={formData.paymentOption}
          onChange={handleInputChange}
          className={styles.selectField}
          required
        >
          <option value="">Выберите способ оплаты</option>
          <option value="sponsorship">Спонсорство</option>
          <option value="negotiable">По договоренности</option>
        </select>

        <label htmlFor="description" className={styles.label}>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Как вы видите ваше путешествие и с кем хотели бы в него отправиться"
          className={styles.textareaField}
          style={{ maxHeight: '300px', overflowY: 'auto' }}
          maxLength="1000"
        />

        <button type="submit" className={styles.submitButton}>Создать объявление</button>
      </form>
    </div>
  );
}