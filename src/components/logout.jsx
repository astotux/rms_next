'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh(); // Обновляем страницу для применения изменений
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="logout"
    >
      Выйти
    </button>
  );
}