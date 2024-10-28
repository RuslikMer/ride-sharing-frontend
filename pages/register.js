import { useState } from 'react';
import { postRequest } from '../utils/api';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    try {
      await postRequest('/auth/register', { username, email, password });
      // window.location.href = '/';
    } catch (error) {
      setError('Ошибка регистрации. Попробуйте еще раз.');
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto" bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" mb={4} textAlign="center">Регистрация</Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <form onSubmit={handleRegister}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="username">Имя пользователя</FormLabel>
            <Input
              id="username"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="email">Электронная почта</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isInvalid={password !== confirmPassword}>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <Box position="relative">
              <Input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === '') {
                    setConfirmPassword('');
                  }
                }}
                required
              />
              <IconButton
                position="absolute"
                right={0}
                top={2}
                onClick={() => setPasswordVisible(!passwordVisible)}
                icon={passwordVisible ? <FaEyeSlash /> : <FaEye />}
                aria-label="Toggle password visibility"
              />
            </Box>
          </FormControl>
          <FormControl isInvalid={password !== confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Подтверждение пароля</FormLabel>
            <Box position="relative">
              <Input
                id="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Подтверждение пароля"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={password === ''}
                required
              />
              <IconButton
                position="absolute"
                right={0}
                top={2}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                icon={confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                aria-label="Toggle confirm password visibility"
              />
            </Box>
            <FormErrorMessage>Пароли не совпадают.</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue">Зарегистрироваться</Button>
        </VStack>
      </form>
    </Box>
  );
}