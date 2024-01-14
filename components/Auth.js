import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function Auth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true); // Yüklenme durumu eklendi

    useEffect(() => {
      if (!checkUserLoggedIn()) {
        router.push('/login');
      } else {
        setLoading(false); // Kullanıcı giriş yapmışsa yüklenme durumunu kapat
      }
    }, [router]);

    if (isLoading) {
      return 
    }

    return <Component {...props} />;
  };
}

function checkUserLoggedIn() {
  return localStorage.getItem('userToken') !== null;
}

export function logout(router) {
  localStorage.removeItem('userToken');
  router.push('/login');
}