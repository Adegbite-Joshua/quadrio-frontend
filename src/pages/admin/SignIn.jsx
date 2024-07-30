import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { serverEndpoint } from '../../constants/server';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        
        if (email && password) {
            axios.post(`${serverEndpoint}/api/admin/login`, {
                email,
                password
            })
            .then((res)=>{
                console.log(res);
                alert("Login successful!")
                Cookies.set('token', res.data.token, { expires: 7 });
                navigate("/admin/dashboard")
            })
            .catch((error)=>{
                alert("Something went wrong")
            })
        } else {
            alert('All fields are required!!')
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignIn;
