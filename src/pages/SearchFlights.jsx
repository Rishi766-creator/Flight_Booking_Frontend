import { useState } from "react";
import api from "../api/axios";

const SearchFlights = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFlights = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.get(
        `/flights/search?from=${from}&to=${to}&date=${date}`
      );
      setFlights(res.data);
    } catch {
      alert("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (flight_id, name, age) => {
    try {
      const res = await api.post("/bookings/book", {
        flight_id,
        passenger_name: name,
        passenger_age: age,
      });
      const { pnr } = res.data;
      window.open(
        `http://localhost:5000/api/bookings/ticket/${pnr}`,
        "_blank"
      );
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Search Flights
      </h2>

      
      <form
        onSubmit={searchFlights}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button className="bg-teal-600 text-white font-semibold rounded-lg w-full py-2">
          Search
        </button>
      </form>

       
      <div className="mt-8">
        {loading && <p>Loading Flights...</p>}
        {flights.length === 0 && !loading && (
          <p className="text-gray-500">No flights found</p>
        )}

        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white rounded-xl shadow p-4 mb-4 flex flex-col md:flex-row md:justify-between gap-4"
          >
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{flight.flight_id}</h3>
              <p>
                {flight.departure_city} → {flight.arrival_city}
              </p>

              <h4 className="mt-4 font-semibold">Passenger Details</h4>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  placeholder="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border p-2 rounded w-full sm:w-32"
                  required
                />
              </div>
            </div>

            
            <div className="flex flex-col justify-between items-start md:items-end">
              <div>
                <p className="text-xl font-bold text-teal-700">
                  ₹{flight.current_price}
                </p>
                 {flight.lastSurgeAt && new Date() - new Date(flight.lastSurgeAt) < 5 * 60 * 1000 && 
                            (<p className="text-sm text-red-500">Surge Applied</p>)}

              </div>

              <button
                onClick={() => handleBook(flight.flight_id, name, age)}
                className="bg-black text-white px-6 py-2 rounded mt-3 w-full md:w-auto"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFlights;
