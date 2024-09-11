export const countryOptions = [
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
    { value: 'spain', label: 'Spain' },
    // Другие страны
  ];
  
  export const getCitiesForCountry = (selectedCountries) => {
    const cities = {
      france: [
        { value: 'paris', label: 'Paris' },
        { value: 'lyon', label: 'Lyon' },
        // Другие города Франции
      ],
      italy: [
        { value: 'rome', label: 'Rome' },
        { value: 'milan', label: 'Milan' },
        // Другие города Италии
      ],
      spain: [
        { value: 'madrid', label: 'Madrid' },
        { value: 'barcelona', label: 'Barcelona' },
        // Другие города Испании
      ],
      // Добавьте города для других стран
    };
  
    return selectedCountries
      .flatMap((country) => cities[country.value] || [])
      .map((city) => ({ value: city.value, label: city.label }));
  };