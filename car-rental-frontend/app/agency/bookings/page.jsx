"use client"
import { useEffect, useState } from "react";
import { API } from "../../../lib/api";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/agency/bookings`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(bookings => {
        if (bookings.error) {
          setError(bookings.error);
        } else {
          setData(bookings);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Bookings</h1>
          <p className="text-gray-600">Manage and track all your rental bookings</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600">Your rental bookings will appear here</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Booking ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold">Car Model</th>
                    <th className="px-6 py-4 text-left font-semibold">Start Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((booking, index) => (
                    <tr key={booking.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">#{booking.id}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.customer_name}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.model}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.start_date}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {booking.days} days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {data.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Booking #{booking.id}</h3>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {booking.days} days
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Customer:</span> {booking.customer_name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Car:</span> {booking.model}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Start Date:</span> {booking.start_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
