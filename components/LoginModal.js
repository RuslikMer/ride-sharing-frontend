import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { postRequest } from '../utils/api';
import { setToken } from '../utils/auth';

export default function LoginModal({ onClose, isOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await postRequest('/auth/login', { email, password });
      const token = response.access_token;

      if (!token) {
        throw new Error('Token not received');
      }

      // Сохраняем токен
      setToken(token);
      onClose(); // Закрываем модальное окно после успешного входа
      router.push('/'); // Перенаправляем на страницу профиля
    } catch (error) {
      console.error('Login Error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    onClose(); // Закрываем модальное окно
    router.push('/register'); // Перенаправляем на страницу регистрации
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text>Login</Text>
            <CloseButton onClick={onClose} />
          </Box>
        </ModalHeader>
        <ModalBody>
          {error && <Text color="red.500">{error}</Text>}
          <form onSubmit={handleLogin}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full" mt={4}>
              Login
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="link" colorScheme="blue" onClick={handleRegisterRedirect}>
            Don&apos;t have an account? Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}