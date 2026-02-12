import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-white">CarRental</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner for premium car rentals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-indigo-400 transition duration-200">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-indigo-400 transition duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Agencies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agency/add-car" className="hover:text-indigo-400 transition duration-200">
                  Add Your Car
                </Link>
              </li>
              <li>
                <Link href="/agency/bookings" className="hover:text-indigo-400 transition duration-200">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 atulkesharwani7307@gmail.com</li>
              <li>📞 +91 7307704290</li>
              <li>📍 Prayagraj, U.P.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Car Rental System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
