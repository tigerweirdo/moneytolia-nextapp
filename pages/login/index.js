import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı gerekli'),
  password: Yup.string().required('Şifre gerekli'),
});

export default function Login() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('userToken', data.token); 
          setLoginStatus('success');
          setTimeout(() => router.push('/'), 2000);
        } else {
          setLoginStatus('fail');
          setErrorMessage(data.message || 'Giriş başarısız');
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginStatus('fail');
        setErrorMessage('Sunucu hatası');
      }
    },
  });

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => setErrorMessage(''), 3000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);


  return (
    <div className={styles.loginForm}>
      <div className={styles.legend}>Hoş Geldin</div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={styles.errorMessage}>
              {formik.errors.username}
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.errorMessage}>
              {formik.errors.password}
            </div>
          )}
        </div>
        {loginStatus === 'fail' && (
        <div className={`${styles.toastMessage} ${errorMessage ? styles.show : ''}`}>
        {errorMessage}
      </div>
      )}
        
        <div className={styles.submitContainer}>
          <button type="submit" className={`${styles.submitButton} ${loginStatus === 'success' ? styles.success : loginStatus === 'fail' ? styles.fail : ''}`}>
            {loginStatus === 'success' ? <FontAwesomeIcon icon={faCheck} /> : loginStatus === 'fail' ? <FontAwesomeIcon icon={faArrowRight} /> : <FontAwesomeIcon icon={faArrowRight} />}
          </button>
        </div>
      </form>
    </div>
  );
}
function checkUserLoggedIn() {
  return localStorage.getItem('userToken') !== null;
}