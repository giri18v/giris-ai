'use client'

import { signIn } from "next-auth/react"

const LoginButton = ({ onSignIn }) => {
  const handleClick = async () => {
    await signIn('google');
    if (onSignIn) {
      onSignIn();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
