export async function getCountryByGeolocation() {
    try {
      const response = await fetch('https://ipinfo.io/json?token=YOUR_TOKEN');
      const data = await response.json();
      return data.country.toLowerCase(); // Вернуть код страны в нижнем регистре
    } catch (error) {
      console.error('Ошибка при определении страны по геолокации', error);
      return null;
    }
  }