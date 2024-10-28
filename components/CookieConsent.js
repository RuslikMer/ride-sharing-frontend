import { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      bg="gray.800"
      color="white"
      textAlign="center"
      p="1rem"
      zIndex="1000"
    >
      <Text display="inline">
        We use cookies to improve your experience on our site. By using our site, you accept our use of cookies.
      </Text>
      <Button
        ml="10px"
        bg="orange.400"
        color="white"
        _hover={{ bg: 'orange.500' }}
        onClick={handleAccept}
      >
        Accept
      </Button>
    </Box>
  );
};

export default CookieConsent;