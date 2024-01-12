import React from 'react';
import { useRouter } from 'next/router';
import { logout } from './Auth';
import styles from '../styles/Header.module.scss';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout(router);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Site Adı</h1>
      </div>   
      <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
    </header>
  );
};

export default Header;
