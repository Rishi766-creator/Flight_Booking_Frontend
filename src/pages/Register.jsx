import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api/axios';
const Register=()=>{
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    });
    const navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try{
        await api.post('/auth/register',form);
        alert("Registered successfully.Please Login");
        navigate('/login');
        }catch(err){
            console.log(err);
            alert(err.response?.data?.error||"Registartion failed.Please try again");
        }

    }
    return(
        <>
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <form className="bg-white flex flex-col p-10 rounded-xl text-xl" onSubmit={handleSubmit}>
                <label className="mb-3">Name:</label>
                <input 
                type="text"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                className="border-b border-gray-300 mb-5 text-[16px] p-2"
                onChange={(e)=>{setForm({...form,name:e.target.value})}}
                />
                <label className="mb-3">Email:</label>
                <input 
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                className="border-b border-gray-300 mb-5 text-[16px] p-2"
                onChange={(e)=>{setForm({...form,email:e.target.value})}}

                />
                <label className="mb-3">Password:</label>
                <input 
                type="password"
                placeholder="Enter your password"
                name="password"
                value={form.password}
                className="border-b border-gray-300 mb-5 text-[16px] p-2"
                onChange={(e)=>{setForm({...form,password:e.target.value})}}

                />
                <button type="submit" className="bg-teal-600 text-white font-semibold text-lg rounded-lg p-2">Register</button>
            </form>
        </div>
        </>
    )

}
export default Register;