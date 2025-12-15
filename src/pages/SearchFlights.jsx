import {useState} from 'react';
import api from '../api/axios';
const SearchFlights=()=>{
    const [from,setFrom]=useState("");
    const [to,setTo]=useState("");
    const [date,setDate]=useState("");
    const [name,setName]=useState("");
    const [age,setAge]=useState("");
    const [flights,setFlights]=useState([]);
    const [loading,setLoading]=useState(false);
    const searchFlights=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const res=await api.get(
                `/flights/search?from=${from}&to=${to}&date=${date}`
            );
            
            setFlights(res.data);
        }catch(err){
            alert("Failed to fetch flights");
        }
        finally{
            setLoading(false);
        }

    };
    const handleBook =async  (flight_id,name,age) => {
        try{
            const token = localStorage.getItem("token");
            const res=await api.post("/bookings/book",{flight_id,passenger_name:name,passenger_age:age});
            console.log(res);
            const {pnr}=res.data;
            window.open(
                 `http://localhost:5000/api/bookings/ticket/${pnr}`,
                    "_blank"
            );
        }catch(err){
            alert(err.response?.data?.error||err.message||"Booking failed");
        }
};

    return(
        <div className="p-10">
            <h2 className='text-3xl font-bold mb-6'>Search Flights</h2>
            <form onSubmit={searchFlights} className="flex gap-4 bg-white p-5 rounded-xl shadow-md">
                <input
                placeholder="From"
                value={from}
                onChange={(e)=>setFrom(e.target.value)}
                className="border p-2 rounded w-full"
                required
                />
                <input
                placeholder="To"
                value={to}
                onChange={(e)=>setTo(e.target.value)}
                className="border p-2 rounded w-full"
                required
                />
                <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                className="border p-2 rounded w-full"
                required
                />
                <button className='bg-teal-600 text-white font-semibold px-6 rounded-lg'>Search</button>
            </form>
            <div className="mt-8">
                {loading&&<p>Loading Flights...</p>}
                {flights.length==0 && !loading && (
                    <p className='text-gray-500'>No flights found</p>
                )}
                {flights.map((flight)=>(
                    <div key={flight._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                    <div>
                        <h3 className='text-xl font-semibold'>{flight.flight_id}</h3>
                        <p>Route: {flight.departure_city} → {flight.arrival_city}</p>
                        <p>Departure: {flight.departure_city}</p>
                         <h1 className="text-xl mt-3 font-semibold">Passenger Details:</h1>
                         <input
                                placeholder="Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className="border p-2 rounded w-full mt-3"
                                required
                        />
                        <input
                                placeholder="Age"
                                type="number"
                                value={age}
                                onChange={(e)=>setAge(e.target.value)}
                                className="border p-2 rounded w-full mt-2"
                                required
                        />
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-teal-700">₹{flight.current_price}</p>

                        {flight.current_price > flight.base_price && (
                            <p className="text-sm text-red-500">Surge Applied </p>
                        )}
                       
                            <button type="button" className="mt-2 bg-black text-white px-4 py-1 rounded" onClick={()=>{handleBook(flight.flight_id,name,age)}}>Book</button>
              
                
                    </div>

                    </div>

                ))}
            </div>


        </div>
    );

};
export default SearchFlights;