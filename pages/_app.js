import { ChakraProvider } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CountryProvider } from '../context/CountryContext';
import CookieConsent from '../components/CookieConsent';
import { SessionProvider } from 'next-auth/react'; // Импорт SessionProvider
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> {/* Оборачиваем приложение в SessionProvider */}
      <ChakraProvider>
        <CountryProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <CookieConsent />
        </CountryProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;