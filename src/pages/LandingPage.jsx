import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { serverEndpoint } from '../constants/server'

export default function LandingPage() {

    const [items, setItems] = useState([]);

      useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`${serverEndpoint}/api/items`, { withCredentials: true });
            setItems(response.data);
          } catch (error) {
            console.error('Error fetching items', error);
          }
        };
    
        fetchItems();
      }, []);

    return (
        <div>
            <Navbar />
            {/* Hero Section */}
            <div className="bg-gray-100 py-20" id="home">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to MyApp</h1>
                    <p className="mt-4 text-gray-600">The best place to manage your items efficiently and effectively.</p>
                    <Link to={'/admin/signup'} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Get Started</Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20" id="features">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Features</h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="text-xl font-semibold text-gray-800">Feature One</h3>
                            <p className="mt-4 text-gray-600">Description of feature one.</p>
                        </div>
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="text-xl font-semibold text-gray-800">Feature Two</h3>
                            <p className="mt-4 text-gray-600">Description of feature two.</p>
                        </div>
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="text-xl font-semibold text-gray-800">Feature Three</h3>
                            <p className="mt-4 text-gray-600">Description of feature three.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-8">Items</h1>
                <ul>
                    {items.map(item => (
                        <li key={item._id} className="mb-2 p-4 bg-white rounded shadow">
                            <Link to={`/item/${item._id}`}>
                                <img src={item.imageUrl} className='w-full h-32' alt="" />
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="text-gray-700">Price: ${item.price}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div >
    )
}
