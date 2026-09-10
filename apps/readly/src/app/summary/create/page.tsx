'use client';

import BookSummaryCreateSection from '@/components/book/BookSummaryCreateSection/BookSummaryCreateSection';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { isLoggedIn, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) router.replace('/');
  }, [isAuthLoading, isLoggedIn, router]);

  if (isAuthLoading || !isLoggedIn) return null;

  return <BookSummaryCreateSection />;
}
