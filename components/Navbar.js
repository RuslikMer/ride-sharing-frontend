import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal'; // Подключаем модальное окно для авторизации
import styles from '../styles/Navbar.module.css';

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
      <nav className={`${styles.navbar} ${isFixed ? styles.fixed : ''}`}>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
            {isMenuOpen ? '✖' : '☰'}
          </span>
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/create-ad">Create Ad</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><button className={styles.loginButton} onClick={openLoginModal}>Login</button></li>
        </ul>
      </nav>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
}