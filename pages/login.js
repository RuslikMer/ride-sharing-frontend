import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Heading, Alert } from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Неверный логин или пароль');
      } else {
        // После успешного логина перенаправляем на страницу профиля
        router.push('/profile');
      }
    } catch (err) {
      setError('Ошибка при авторизации. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} maxWidth="400px" margin="0 auto">
      <Heading as="h1" mb={4}>Войти в систему</Heading>

      {error && <Alert status="error" mb={4}>{error}</Alert>}

      <form onSubmit={handleLogin}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Введите email"
          />
        </FormControl>

        <FormControl id="password" mb={4}>
          <FormLabel>Пароль</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Введите пароль"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="100%" isLoading={loading}>
          Войти
        </Button>
      </form>
    </Box>
  );
}