import { useEffect, useState } from 'react';
import { getRequest } from '../utils/api';
import { getAuthHeaders, removeToken } from '../utils/auth';
import { Box, Heading, Text, Spinner, Alert } from '@chakra-ui/react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getRequest('/auth/profile', { headers: getAuthHeaders() });
        setProfile(data);
      } catch (error) {
        setError('Не удалось загрузить профиль.');
        // Очистка токена и перенаправление на страницу входа при ошибке
        removeToken();
        window.location.href = '/';
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <Alert status="error" variant="solid" mb={4}>
        {error}
      </Alert>
    );
  }

  return (
    <Box p={6}>
      <Heading as="h1" mb={4}>Профиль</Heading>
      {profile ? (
        <Box>
          <Text fontSize="lg" mb={2}>Email: {profile.email}</Text>
          <Text fontSize="lg">Дата регистрации: {new Date(profile.createdAt).toLocaleDateString()}</Text>
        </Box>
      ) : (
        <Spinner size="lg" />
      )}
    </Box>
  );
}