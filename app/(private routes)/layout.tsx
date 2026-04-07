import { Suspense } from 'react';
import CategoriesModal from '@/components/Modals/CategoriesModal/CategoriesModal';
import Header from '@/components/Layout/Header/Header';
import Loader from '@/components/UI/Loader/Loader';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <main className="container" style={{ paddingTop: '40px' }}>
          {children}
        </main>
      </Suspense>
      <CategoriesModal />
    </>
  );
}
