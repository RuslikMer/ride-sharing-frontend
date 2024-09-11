import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CountryProvider } from '../context/CountryContext'; // Импортируйте CountryProvider

function MyApp({ Component, pageProps }) {
  return (
    <CountryProvider> {/* Оберните все компоненты в CountryProvider */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CountryProvider>
  );
}

export default MyApp;