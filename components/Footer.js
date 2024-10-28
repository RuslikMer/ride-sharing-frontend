import { Box, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" backgroundColor="#333" color="white" textAlign="center" padding="1rem">
      <Text>&copy; 2024 Ride Sharing App. All rights reserved.</Text>
    </Box>
  );
}