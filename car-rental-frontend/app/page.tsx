import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className=" text-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to Car Rental System
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-800">
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
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition duration-200 inline-block shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className=" py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl mb-8 text-gray-800">
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
