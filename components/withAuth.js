import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
      const router = useRouter();
  
      useEffect(() => {
        const isLoggedIn = checkUserLoggedIn();
        if (!isLoggedIn) {
          router.push('/login');
        }
      }, [router]); // Burada 'router' bağımlılık olarak eklendi
  
      return <Component {...props} />;
    };
  }
  

function checkUserLoggedIn() {
  // Burada oturum kontrolü (Örneğin, localStorage kontrolü)
  return localStorage.getItem('userToken') !== null;
}
