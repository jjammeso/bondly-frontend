'use client';

import { useState } from 'react';
import {  useRouter } from 'next/navigation';
import { useAuth } from '@/contex/AuthContext';
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setAuthorized} = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token); // ← Save user
                setAuthorized(true);
                router.push('/home'); // redirect after successful login

            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/googleAuth/google`;
        } catch (err) {
            console.error('Google login error:', err);
            setError('Something went wrong during Google login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Log In
                    </button>
                </form>
                {/* Google Login Button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        <FcGoogle className="text-xl bg-white rounded-full" />
                        Log In with Google
                    </button>
                </div>

                {/* Link to Register Page */}
                <p className="text-center mt-4 text-sm">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
