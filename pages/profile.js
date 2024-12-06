import { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Важно для передачи куки при запросе
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
        setError('Не удалось загрузить профиль.');
        router.push('/login'); // Перенаправляем на страницу логина
      }
    };

    fetchProfile();
  }, [router]);

  if (error) {
    return (
      <Alert status="error" variant="solid" mb={4}>
        {error}
      </Alert>
    );
  }

  if (!profile) {
    return <Spinner size="lg" />;
  }

  return (
    <Box p={6}>
      <Heading as="h1" mb={4}>Профиль</Heading>
      <Box>
        <Text fontSize="lg" mb={2}>Email: {profile.email}</Text>
        <Text fontSize="lg">Дата регистрации: {new Date(profile.created_at).toLocaleDateString()}</Text>
      </Box>
    </Box>
  );
}