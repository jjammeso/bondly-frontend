// app/components/UserInfo.tsx
"use client";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/auth"; // Adjust this path
import { useRouter } from "next/navigation";
import { useAuth } from "@/contex/AuthContext";

interface DecodedUser {
  user_id: number;
  username: string;
}

export default function UserInfo() {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [open, setOpen] = useState(false);
  const {authorized, setAuthorized} = useAuth()
  const router = useRouter();

  useEffect(() => {
    const decoded = getLoggedInUser();
    setUser(decoded);
  }, [authorized]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthorized(false);
    setOpen(false)
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-white hover:bg-gray-800 p-2 rounded-md"
      >
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold uppercase">
          {user.username.charAt(0)}
        </div>
        <span className="hidden sm:inline">{user.username}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 text-black">
          <ul className="py-1 text-sm">
            <li
              onClick={() => {
                setOpen(false);
                router.push("/profile");
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </li>
            <li
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
