'use client';
import AdminLoginForm from '@/components/adminLoginForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем куки на клиенте
    if (getCookie('adminToken')) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AdminLoginForm />
    </div>
  );
}