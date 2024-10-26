'use client'

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import LoginButton from "./LoginButton";
import Image from 'next/image';
import { useState } from 'react';

const ClientHome = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageAPIKeys = () => {
    router.push('/dashboards');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <button
        onClick={handleManageAPIKeys}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Manage API Keys
      </button>
      {!session ? (
        <LoginButton />
      ) : (
        <div className="flex gap-4 items-center">
          {session.user.image && !imageError ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">{session.user.name?.[0]}</span>
            </div>
          )}
          <p className="text-sm text-center sm:text-left">
            Welcome, {session.user.name}!
          </p>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientHome;
