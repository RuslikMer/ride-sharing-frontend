import Head from 'next/head';
import Link from 'next/link';
import { Box, Heading, Text, VStack, List, ListItem, Button } from '@chakra-ui/react';
import SearchForm from '../components/SearchForm';
import { useState } from 'react';

// Моковые данные для популярных объявлений
const popularAds = [
  { id: 1, title: 'Поездка в Москву', views: 150 },
  { id: 2, title: 'Поездка в Париж', views: 120 },
  { id: 3, title: 'Поездка в Нью-Йорк', views: 100 },
  { id: 4, title: 'Поездка в Рим', views: 90 },
  { id: 5, title: 'Поездка в Токио', views: 85 },
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
    <Box p={4} bg="gray.50" minH="100vh">
      <Head>
        <title>Ride Sharing</title>
        <meta name="description" content="Ride Sharing App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl">Добро пожаловать в Ride Sharing</Heading>
          <Text fontSize="lg" mt={2}>Найдите попутчиков и управляйте своими поездками.</Text>
        </Box>

        <SearchForm onChange={handleSearchChange} onSubmit={handleSearchSubmit} />

        {/* Блок популярных объявлений */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>Популярные объявления</Heading>
          <List spacing={3}>
            {popularAds.map(ad => (
              <ListItem key={ad.id}>
                <Link href={`/ad/${ad.id}`}>
                  <Button variant="link" colorScheme="blue">{ad.title}</Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
}