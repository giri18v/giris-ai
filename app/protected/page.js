'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Layout from '../components/Layout';
import Notification from '../components/Notification';

const ProtectedPage = () => {
  const [isValidKey, setIsValidKey] = useState(null);
  const [notification, setNotification] = useState(null);
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('key');

  useEffect(() => {
    const validateApiKey = async () => {
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('key', apiKey)
          .single();

        if (error) throw error;

        setIsValidKey(!!data);
        setNotification({
          message: data ? 'Valid API Key' : 'Invalid API Key',
          type: data ? 'success' : 'error'
        });
      } catch (error) {
        console.error('Error validating API key:', error);
        setIsValidKey(false);
        setNotification({
          message: 'Error validating API Key',
          type: 'error'
        });
      }
    };

    if (apiKey) {
      validateApiKey();
    }
  }, [apiKey]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Protected Area</h1>
        {isValidKey === null ? (
          <p>Validating API key...</p>
        ) : isValidKey ? (
          <p className="text-green-600">Welcome to the protected area!</p>
        ) : (
          <p className="text-red-600">Access denied. Invalid API key.</p>
        )}
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </Layout>
  );
};

export default ProtectedPage;
