import { Box, Text } from '@chakra-ui/react';

export default function MessageCard({ message }) {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      padding="4" 
      marginBottom="4" 
      backgroundColor="white" 
      boxShadow="sm"
    >
      <Text fontWeight="bold">{message.sender}:</Text>
      <Text>{message.content}</Text>
      <Text fontSize="sm" color="gray.500">
        Sent on: {new Date(message.createdAt).toLocaleDateString()}
      </Text>
    </Box>
  );
}