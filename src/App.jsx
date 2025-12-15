import {Routes,Route, BrowserRouter} from 'react-router-dom';
import SearchFlights from './pages/SearchFlights';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import Navbar from './components/Navbar';
import ProtectedRoute from './pages/ProtectedRoute';


const App=()=>{
  return(
  <>
  <Navbar />
  <Routes>
    <Route path='/' element={<SearchFlights />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>
    <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>}></Route>
  </Routes>
  </>
  )

}
export default App;