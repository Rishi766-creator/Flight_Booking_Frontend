import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api/axios';
import {AuthContext} from '../context/authContext';
const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);
    async function handleSubmit(e){
        e.preventDefault();
        try{
        const res=await api.post('/auth/login',{email,password});
        
    console.log("LOGIN RESPONSE DATA 👉", res.data);
    console.log("LOGIN RESPONSE USER 👉", res.data.user);
        login(res.data);
        alert("Login successfully");
        navigate('/');
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error||"Login failed.Please try again");
        }

    }
    return(
        <>
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <form className="bg-white flex flex-col p-10 rounded-xl text-xl" onSubmit={handleSubmit}>
                
                <label className="mb-3">Email:</label>
                <input 
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                className="border-b border-gray-300 mb-5 text-[16px] p-2"
                onChange={(e)=>{setEmail(e.target.value)}}

                />
                <label className="mb-3">Password:</label>
                <input 
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                className="border-b border-gray-300 mb-5 text-[16px] p-2"
                onChange={(e)=>{setPassword(e.target.value)}}

                />
                <button type="submit" className="bg-teal-600 text-white font-semibold text-lg rounded-lg p-2">Login</button>
            </form>
        </div>
        </>
    )

}
export default Login;