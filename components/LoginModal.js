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
import { signIn } from 'next-auth/react';

export default function LoginModal({ onClose, isOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // предотвращает автоматический редирект после входа
      email,
      password,
    });

    if (result.error) {
      setError('Login failed. Please try again.');
    } else {
      onClose(); // Закрываем модальное окно после успешного входа
      router.push('/'); // Перенаправляем на главную страницу
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