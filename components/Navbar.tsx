// app/components/Navbar.tsx
import UserInfo from '@/components/UserInfo';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white relative">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
        <div className="relative w-[120px] h-[50px]">
          <Image
            src="/icon.png"
            alt="Bondly Logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/home" className="hover:opacity-80 transition text-lg">
          Home
        </Link>
      </div>

      <UserInfo />
    </nav>
  );
}
