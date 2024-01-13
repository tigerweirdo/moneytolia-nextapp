import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { logout } from './Auth';
import styles from '../styles/Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // 'faSignOut' alternatifi

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout(router);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image 
          src="/logo.png" 
          alt="Site Logo" 
          width={230}
          height={60}
        />
      </div>
      <nav className={styles.navigation}>
        {/* Buraya navigasyon elemanlarınızı ekleyebilirsiniz */}
      </nav>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
      </button>
    </header>
  );
};

export default Header;
