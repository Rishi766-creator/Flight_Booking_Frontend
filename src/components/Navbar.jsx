import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/authContext";
const Navbar=()=>{
    const {user,logout}=useContext(AuthContext);
    console.log("Navbar user:", user);

    return(
    <div className="flex justify-between items-center p-3 bg-teal-600 text-white ">
    <h1 className="text-3xl font-bold font-serif ml-5">Fly High</h1>
    <nav className="space-x-4 mr-3 text-lg font-semibold">
        <Link to="/" className="hover:text-teal-200">Search</Link>
        <Link to="/bookings" className="hover:text-teal-200">Bookings</Link>

        {user ? (
          <>
            
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-200">Login</Link>
            <Link to="/register" className="hover:text-teal-200">Register</Link>
          </>
        )}
    </nav>
    </div>
    )

}
export  default Navbar;