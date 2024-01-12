import React from 'react';
import { useRouter } from 'next/router';
import { logout } from './Auth';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout(router);
  };

  return (
    <header>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </header>
  );
};

export default Header;
