"use client"
import { useState } from "react";
import { API } from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function AddCar() {
  const router = useRouter();
  const [car, setCar] = useState({
    model: "",
    vehicle_number: "",
    seating_capacity: 5,
    rent_per_day: 1000
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/cars`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Failed to add car. Please try again.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/agency/your-cars");
        }, 1500);
      }
    } catch (error) {
      console.error("Add car error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50  py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Your Car</h1>
          <p className="text-gray-600">List your vehicle for rent</p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              Car added successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="model" className="block text-sm font-semibold text-gray-700 mb-2">
                Car Model
              </label>
              <input
                id="model"
                type="text"
                required
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
                placeholder="e.g., Toyota Camry 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              />
            </div>

            <div>
              <label htmlFor="vehicle_number" className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Number
              </label>
              <input
                id="vehicle_number"
                type="text"
                required
                value={car.vehicle_number}
                onChange={(e) => setCar({ ...car, vehicle_number: e.target.value })}
                placeholder="e.g., ABC-1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              />
            </div>

            <div>
              <label htmlFor="seating_capacity" className="block text-sm font-semibold text-gray-700 mb-2">
                Seating Capacity
              </label>
              <select
                id="seating_capacity"
                value={car.seating_capacity}
                onChange={(e) => setCar({ ...car, seating_capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none bg-white"
              >
                {[2, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} seats</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rent_per_day" className="block text-sm font-semibold text-gray-700 mb-2">
                Rent Per Day (₹)
              </label>
              <input
                id="rent_per_day"
                type="number"
                required
                min="100"
                value={car.rent_per_day}
                onChange={(e) => setCar({ ...car, rent_per_day: parseInt(e.target.value) })}
                placeholder="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Car..." : "Add Car"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
