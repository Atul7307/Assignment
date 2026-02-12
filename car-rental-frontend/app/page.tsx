import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to Car Rental System
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-indigo-100">
            Rent premium cars easily from trusted rental agencies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition duration-200 shadow-lg"
            >
              Browse Cars
            </Link>
            <Link
              href="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-600 transition duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="text-indigo-600 text-5xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Wide Selection</h3>
              <p className="text-gray-600">
                Choose from a diverse fleet of well-maintained vehicles to suit your needs
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="text-purple-600 text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Best Prices</h3>
              <p className="text-gray-600">
                Competitive rates with no hidden fees, transparent pricing guaranteed
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="text-pink-600 text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Booking</h3>
              <p className="text-gray-600">
                Easy and fast booking process, get on the road in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Sign up now and get access to our entire fleet of vehicles
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition duration-200 inline-block shadow-lg"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
