import { useRouter } from 'next/router';
import styles from '../styles/Search.module.css';

// Моковые данные для объявлений (замените на реальный запрос к API)
const ads = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Поездка ${index + 1}`,
  views: Math.floor(Math.random() * 200),
}));

const ITEMS_PER_PAGE = 10;

export default function Search() {
  const router = useRouter();
  const { destinationCountry, lookingFor, paymentOption } = router.query;

  const page = parseInt(router.query.page) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedAds = ads.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(ads.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    router.push(`/search?page=${newPage}&destinationCountry=${destinationCountry}&lookingFor=${lookingFor}&paymentOption=${paymentOption}`);
  };

  return (
    <div>
      <h1>Результаты поиска</h1>
      <section className={styles.searchResultsSection}>
        <ul className={styles.searchResultsList}>
          {paginatedAds.map(ad => (
            <li key={ad.id}>
              <a href={`/ad/${ad.id}`} className={styles.searchResultLink}>
                {ad.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Пагинация */}
        <div className={styles.pagination}>
          {page > 1 && (
            <button onClick={() => handlePageChange(page - 1)}>Предыдущая</button>
          )}
          {page < totalPages && (
            <button onClick={() => handlePageChange(page + 1)}>Следующая</button>
          )}
        </div>
      </section>
    </div>
  );
}