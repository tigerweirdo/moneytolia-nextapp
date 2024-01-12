import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function Auth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      if (!checkUserLoggedIn()) {
        router.push('/login');
      }
    }, [router]);

    return <Component {...props} logout={logout} />;
  };
}

function checkUserLoggedIn() {
  return localStorage.getItem('userToken') !== null;
}

export function logout(router) {
  localStorage.removeItem('userToken');
  router.push('/login');
}
