import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import SearchForm from '../components/SearchForm';
import { useState } from 'react';

// Моковые данные для популярных объявлений (замените на реальный запрос к API)
const popularAds = [
  { id: 1, title: 'Поездка в Москву', views: 150 },
  { id: 2, title: 'Поездка в Париж', views: 120 },
  { id: 3, title: 'Поездка в Нью-Йорк', views: 100 },
  { id: 4, title: 'Поездка в Рим', views: 90 },
  { id: 5, title: 'Поездка в Токио', views: 85 },
];

const countryOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'us', label: 'США' },
  { value: 'de', label: 'Германия' },
  { value: 'fr', label: 'Франция' },
  { value: 'it', label: 'Италия' },
  // Добавьте другие страны по необходимости
];

const lookingForOptions = [
  { value: 'companion', label: 'Попутчик' },
  { value: 'companion_female', label: 'Попутчицу' },
  { value: 'company', label: 'Компанию' },
];

const paymentOptions = [
  { value: 'sponsorship', label: 'Спонсорство' },
  { value: 'negotiable', label: 'По договоренности' },
];

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    destinationCountry: '',
    lookingFor: '',
    paymentOption: '',
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Перенаправление на страницу результатов поиска
    window.location.href = `/search?destinationCountry=${searchParams.destinationCountry}&lookingFor=${searchParams.lookingFor}&paymentOption=${searchParams.paymentOption}`;
  };

  return (
    <div>
      <Head>
        <title>Ride Sharing</title>
        <meta name="description" content="Ride Sharing App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Ride Sharing</h1>
        <p className={styles.description}>Find travel partners and manage your rides.</p>

        <SearchForm />
        {/* Блок популярных объявлений */}
        <section className={styles.popularAdsSection}>
          <h2>Популярные объявления</h2>
          <ul className={styles.popularAdsList}>
            {popularAds.map(ad => (
              <li key={ad.id} className={styles.popularAdItem}>
                <Link href={`/ad/${ad.id}`} className={styles.popularAdLink}>
                  {ad.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}