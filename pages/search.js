import { useRouter } from 'next/router';
import { Box, Button, Heading, List, ListItem, Link } from '@chakra-ui/react';

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
    <Box p={6}>
      <Heading as="h1" mb={4}>Результаты поиска</Heading>
      <section>
        <List spacing={3}>
          {paginatedAds.map(ad => (
            <ListItem key={ad.id} p={2} borderWidth={1} borderRadius="md" bg="white" boxShadow="sm">
              <Link href={`/ad/${ad.id}`} color="blue.500" fontWeight="bold">
                {ad.title}
              </Link>
            </ListItem>
          ))}
        </List>

        {/* Пагинация */}
        <Box mt={4}>
          {page > 1 && (
            <Button onClick={() => handlePageChange(page - 1)} mr={2}>
              Предыдущая
            </Button>
          )}
          {page < totalPages && (
            <Button onClick={() => handlePageChange(page + 1)}>
              Следующая
            </Button>
          )}
        </Box>
      </section>
    </Box>
  );
}