import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Button, Flex, Text, Collapse, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import LoginModal from './LoginModal'; // Подключаем модальное окно для авторизации

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Управление состоянием модального окна

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        bg="blue.500"
        p="1rem"
        color="white"
        position={isFixed ? 'fixed' : 'relative'}
        width="100%"
        zIndex={1}
        transition="0.3s"
      >
        <Flex justifyContent="space-between" alignItems="center">
          {/* Логотип и пункты меню для десктопа */}
          <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
            <Link href="/" passHref>
              <Text mx="2" color="white">Home</Text>
            </Link>
            <Link href="/create-ad" passHref>
              <Text mx="2" color="white">Create Ad</Text>
            </Link>
            <Link href="/profile" passHref>
              <Text mx="2" color="white">Profile</Text>
            </Link>
            <Button variant="link" color="white" onClick={openLoginModal}>
              Login
            </Button>
          </Box>

          {/* Гамбургер и меню для мобильных устройств */}
          <IconButton
            aria-label="Toggle Menu"
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggleMenu}
            variant="outline"
            colorScheme="whiteAlpha"
            display={{ base: 'inline-flex', md: 'none' }} // Видим только на мобильных
          />
        </Flex>

        {/* Мобильное меню */}
        <Collapse in={isMenuOpen} animateOpacity>
          <Flex
            as="ul"
            listStyleType="none"
            flexDirection="column"
            alignItems="flex-start"
            mt="1rem"
            display={{ base: 'flex', md: 'none' }} // Только для мобильных
          >
            <li><Link href="/" passHref><Text color="white">Home</Text></Link></li>
            <li><Link href="/create-ad" passHref><Text color="white">Create Ad</Text></Link></li>
            <li><Link href="/profile" passHref><Text color="white">Profile</Text></Link></li>
            <li>
              <Button variant="link" color="white" onClick={openLoginModal}>
                Login
              </Button>
            </li>
          </Flex>
        </Collapse>
      </Box>

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} isOpen={isLoginModalOpen} />}
    </>
  );
}