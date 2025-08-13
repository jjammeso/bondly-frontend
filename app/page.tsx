import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative px-6 pt-20 pb-16 sm:px-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Image
                  src="/icon.png"
                  alt="Bondly Logo"
                  width={120}
                  height={120}
                  className="drop-shadow-2xl"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Bondly
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-2xl mx-auto sm:text-2xl">
              Connect with friends and the world around you. Share your thoughts, 
              discover new perspectives, and build meaningful relationships.
            </p>

            {/* Feature Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                ✨ Share Posts
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                💬 Engage & Comment
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                🤝 Build Connections
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 min-w-[160px]">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link href="/login">
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 min-w-[160px]">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 px-6 sm:px-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Why Choose Bondly?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Experience social networking like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fast & Intuitive</h3>
              <p className="text-gray-300">
                Lightning-fast performance with a clean, intuitive interface that makes sharing effortless.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure & Private</h3>
              <p className="text-gray-300">
                Your privacy matters. Advanced security features keep your data safe and your conversations private.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Community Focused</h3>
              <p className="text-gray-300">
                Built for meaningful connections. Discover like-minded people and engage in authentic conversations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative py-16 px-6 sm:px-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users already connecting on Bondly
          </p>
          <Link href="/register">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              Create Your Account
            </button>
          </Link>
        </div>
      </div>
  )
  );
}