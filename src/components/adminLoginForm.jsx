'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import '@/styles/admin.css';

export default function AdminLoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('login');
  const [adminId, setAdminId] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.requires2FA) {
          setStep('verify');
          setAdminId(data.adminId);
        } else {
          setCookie('adminToken', data.token, { 
            path: '/',
            maxAge: 1800, // 30 минут
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          router.push('/admin');
        }
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка соединения');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, code })
      });

      const data = await res.json();

      if (res.ok) {
        setCookie('adminToken', data.token, {
          path: '/',
          maxAge: 1800, // 30 минут
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        router.push('/admin');
      } else {
        setError(data.error || 'Неверный код подтверждения');
      }
    } catch (err) {
      setError('Ошибка соединения');
    }
  };
  return (
    <div className="admin-login">
      <h2>Вход в админку</h2>
      
      {error && (
        <div>
          {error}
        </div>
      )}

      {step === 'login' ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
          >
            Войти
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <p className="mb-4">
              Код отправлен в ваш Telegram.<br/>Введите его ниже:
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-значный код"
              required
            />
          </div>
          <button
            type="submit"
          >
            Подтвердить
          </button>
        </form>
      )}
    </div>
  );
}