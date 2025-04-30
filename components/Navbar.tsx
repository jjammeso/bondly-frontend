// app/components/Navbar.tsx
import UserInfo from '@/components/UserInfo'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">Bondly</div>
      <UserInfo />
    </nav>
  );
}
