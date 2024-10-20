'use client'

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const ProtectedContent = dynamic(() => import('../components/ProtectedContent'), {
  ssr: false,
});

const ProtectedPage = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedContent />
      </Suspense>
    </Layout>
  );
};

export default ProtectedPage;
