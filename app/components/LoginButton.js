'use client'

import { signIn } from "next-auth/react";
import { useState } from 'react';

const LoginButton = ({ callbackUrl = '/dashboards' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Signing In...' : 'Sign In with Google'}
    </button>
  );
};

export default LoginButton;
