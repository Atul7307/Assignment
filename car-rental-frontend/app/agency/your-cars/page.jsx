"use client"
import { useEffect, useState } from "react";
import { API } from "../../../lib/api";
import Link from "next/link";

export default function YourCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    model: "",
    vehicle_number: "",
    seating_capacity: 5,
    rent_per_day: 1000
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${API}/api/agency/cars`, {
        credentials: "include"
      });
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setCars(data);
      }
    } catch {
      setError("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car.id);
    setFormData({
      model: car.model,
      vehicle_number: car.vehicle_number,
      seating_capacity: car.seating_capacity,
      rent_per_day: car.rent_per_day
    });
  };

  const handleUpdate = async (carId) => {
    try {
      const response = await fetch(`${API}/api/cars/${carId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Car updated successfully!");
        setEditingCar(null);
        fetchCars();
      }
    } catch {
      alert("Failed to update car");
    }
  };

  const handleCancel = () => {
    setEditingCar(null);
    setFormData({
      model: "",
      vehicle_number: "",
      seating_capacity: 5,
      rent_per_day: 1000
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cars</h1>
            <p className="text-gray-600">Manage your vehicle inventory</p>
          </div>
          <Link
            href="/agency/add-car"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            + Add New Car
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No cars added yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first vehicle to the inventory</p>
            <Link
              href="/agency/add-car"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Add Your First Car
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                {/* Car Image Placeholder */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 flex items-center justify-center">
                  <span className="text-8xl">🚗</span>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  {editingCar === car.id ? (
                    // Edit Form
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Model</label>
                        <input
                          type="text"
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Number</label>
                        <input
                          type="text"
                          value={formData.vehicle_number}
                          onChange={(e) => setFormData({ ...formData, vehicle_number: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Seating Capacity</label>
                        <select
                          value={formData.seating_capacity}
                          onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        >
                          {[2, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} seats</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Rent Per Day (₹)</label>
                        <input
                          type="number"
                          value={formData.rent_per_day}
                          onChange={(e) => setFormData({ ...formData, rent_per_day: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(car.id)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display View
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{car.model}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600 flex items-center">
                          <span className="mr-2">🔢</span>
                          <span className="font-semibold">Vehicle:</span>
                          <span className="ml-2">{car.vehicle_number}</span>
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <span className="mr-2">👥</span>
                          <span className="font-semibold">Capacity:</span>
                          <span className="ml-2">{car.seating_capacity} seats</span>
                        </p>
                        <p className="text-indigo-600 text-2xl font-bold mt-4">
                          ₹{car.rent_per_day}<span className="text-base text-gray-600">/day</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleEdit(car)}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                      >
                        Edit Details
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
