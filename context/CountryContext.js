import React, { createContext, useState, useContext } from 'react';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [country, setCountry] = useState({ value: 'ru', label: 'Россия' });

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}