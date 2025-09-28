// components/NewsTicker.tsx
'use client';
import { useEffect, useState } from 'react';

export default function NewsTicker({ lang = 'ar' }: { lang?: string }) {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch breaking news
    fetch('/api/headlines')
      .then(res => res.json())
      .then(data => setHeadlines(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % headlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  if (!headlines.length) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        <span className="bg-white text-red-600 px-3 py-1 rounded font-bold mr-4">
          {lang === 'ar' ? 'عاجل' : 'URGENT'}
        </span>
        <div className="flex-1">
          <p className="animate-pulse">{headlines[currentIndex]}</p>
        </div>
      </div>
    </div>
  );
}