// _app.js
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CountryProvider } from '../context/CountryContext';
import CookieConsent from '../components/CookieConsent';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CountryProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <CookieConsent />
      </CountryProvider>
    </ChakraProvider>
  );
}

export default MyApp;