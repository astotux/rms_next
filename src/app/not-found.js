import '@/styles/policy.css';
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
        <div class="privacy-container not-found-container">
            <div>
                <h1>Упс, такой страницы нет</h1>
                <Link href="/" class="back-link">← Вернуться на главную</Link>
            </div>
            
        </div>
    </main>
  );
}
