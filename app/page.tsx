// app/(landing)/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Bondly</h1>
      <p className="text-center max-w-xl text-gray-300 mb-8">
        Connect with friends and the world around you. Share posts, like and comment on posts, and build your social network seamlessly.
      </p>

      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </Link>
        <Link href="/register">
          <button className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
            Register
          </button>
        </Link>
      </div>
    </main>
  );
}
