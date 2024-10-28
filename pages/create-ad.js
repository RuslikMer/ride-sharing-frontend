import { Box, Heading } from '@chakra-ui/react';
import CreateAdForm from '../components/CreateAdForm';

export default function CreateAdPage() {
  return (
    <Box p={4} bg="gray.50" minH="100vh">
      <Heading as="h1" mb={4}>
        Создать Объявление
      </Heading>
      <CreateAdForm />
    </Box>
  );
}