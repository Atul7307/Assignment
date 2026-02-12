"use client"
import { useEffect, useState } from "react";
import { API } from "../../lib/api";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/cars`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rent = async (carId) => {
    const data = bookingData[carId] || { start_date: "2026-02-20", days: 2 };
    
    try {
      await fetch(`${API}/api/book`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_id: carId,
          start_date: data.start_date,
          days: parseInt(data.days)
        })
      });
      alert("Car booked successfully!");
      setShowBookingModal(null);
    } catch {
      alert("Error booking car. Please try again.");
    }
  };

  const updateBookingData = (carId, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [carId]: {
        ...(prev[carId] || { start_date: "2026-02-20", days: 2 }),
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Cars</h1>
          <p className="text-lg text-gray-600">Choose from our wide selection of premium vehicles</p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <p className="text-xl text-gray-600">No cars available at the moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                {/* Car Image Placeholder */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 flex items-center justify-center">
                  <span className="text-8xl">🚗</span>
                </div>

                {/* Car Details */}
                <div className="p-6">
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
                    onClick={() => setShowBookingModal(car.id)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Book Your Car</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={bookingData[showBookingModal]?.start_date || "2026-02-20"}
                    onChange={(e) => updateBookingData(showBookingModal, 'start_date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bookingData[showBookingModal]?.days || 2}
                    onChange={(e) => updateBookingData(showBookingModal, 'days', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => rent(showBookingModal)}
                  className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowBookingModal(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
