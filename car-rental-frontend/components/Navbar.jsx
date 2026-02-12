"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API } from "../lib/api";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API}/api/me`, {
        credentials: "include",
      });
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    router.push("/");
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🚗</span>
              <span className="text-xl font-bold text-indigo-600">CarRental</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold text-indigo-600">CarRental</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
            >
              Home
            </Link>
            
            {user?.role === "customer" && (
              <Link
                href="/cars"
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
              >
                Browse Cars
              </Link>
            )}
            
            {user?.role === "agency" && (
              <>
                <Link
                  href="/agency/your-cars"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
                >
                  Your Cars
                </Link>
                <Link
                  href="/agency/add-car"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
                >
                  Add Car
                </Link>
                <Link
                  href="/agency/bookings"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
                >
                  Bookings
                </Link>
              </>
            )}

            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {user && (
              <div className="px-3 py-2 text-gray-700 font-semibold border-b border-gray-200 mb-2">
                Welcome, {user.name}
              </div>
            )}
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {user?.role === "customer" && (
              <Link
                href="/cars"
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Cars
              </Link>
            )}
            
            {user?.role === "agency" && (
              <>
                <Link
                  href="/agency/your-cars"
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Cars
                </Link>
                <Link
                  href="/agency/add-car"
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Car
                </Link>
                <Link
                  href="/agency/bookings"
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 bg-indigo-600 text-white rounded-lg text-center font-semibold hover:bg-indigo-700 transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
