import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contex/AuthContext";

export const metadata: Metadata = {
  title: "Bondly",
  description: "Bondly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <footer className="bg-gray-800 text-center text-gray-400 text-sm py-10">
          Found a bug? Please report it to <a href="mailto:sjjamtsho@gmail.com" className="text-blue-400 hover:underline">sjjamtsho@gmail.com</a>
        </footer>
      </body>
    </html>
  );
}
