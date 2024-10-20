'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';

const APIPlayground = () => {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/protected?key=${apiKey}`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">API Playground</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
              Enter your API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default APIPlayground;
