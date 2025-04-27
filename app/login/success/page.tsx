// app/login/success/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Capture the token from the URL query parameters
    const token = new URLSearchParams(window.location.search).get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Optionally, you can redirect the user to a different page
      router.push('/home'); // or any other page you want
    } else {
      // Handle the error if no token is found in the URL
      console.error('No token found in the URL');
      // Optionally, you can redirect to the login page or show an error message
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Logging in...</h1>
        <p className="text-center">Please wait while we redirect you to your dashboard.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
