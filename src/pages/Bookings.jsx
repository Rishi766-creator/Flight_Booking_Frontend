import {useEffect,useState} from 'react';
import api from "../api/axios";
const Bookings=()=>{
    const [bookings,setBookings]=useState([]);

    useEffect(()=>{
        const fetchBookings=async ()=>{
        try{
        const res=await api.get("/bookings/history");
        setBookings(res.data.bookings);
        }catch(err){
            alert("Failed to load bookings");
        }

    }
    fetchBookings();},[]);
     
    return(
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
            {bookings.map(b=>(
                <div key={b._id} className="bg-white p-4 mb-4 rounded-xl shadow">
                    <p className="font-semibold">{b.airline}</p>
                    <p>{b.departure_city} → {b.arrival_city}</p>
                    <p>PNR: {b.pnr}</p>
                    <p>₹{b.amount_paid}</p>
                    </div>
          

                    
            ))}
        </div>
    )

}
export default Bookings;