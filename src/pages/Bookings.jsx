import { useEffect, useState } from "react";
import api from "../api/axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/history");
        setBookings(res.data.bookings);
      } catch (err) {
        alert("Failed to load bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="px-4 py-6 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        My Bookings
      </h2>

      {bookings.length === 0 && (
        <p className="text-gray-500 text-center">No bookings found</p>
      )}

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            
            <div className="space-y-1">
              <p className="font-semibold text-lg">{b.airline}</p>
              <p className="text-sm text-gray-600">
                {b.departure_city} → {b.arrival_city}
              </p>
              <p className="text-sm">PNR: {b.pnr}</p>
            </div>

            
            <div className="mt-3 sm:mt-0 text-right">
              <p className="text-lg font-bold text-teal-700">
                ₹{b.amount_paid}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
