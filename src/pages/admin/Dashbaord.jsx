import React, { useEffect, useState } from 'react';
import ItemList from '../../components/admin/ItemList';
import ItemForm from '../../components/admin/ItemForm';
import axios from 'axios';
import { serverEndpoint } from '../../constants/server';
import useAuth from '../../hooks/adminAuth';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAuthenticated, adminDetails] = useAuth();


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

  const addItem = async (item) => {
    try {
      console.log(item);
      const response = await axios.post(`${serverEndpoint}/api/items`, item, { withCredentials: true });
      setItems([...items, response.data]);
      alert("Item added successfully!")
    } catch (error) {
      console.error('Error adding item', error);
      alert("Something went wrong!");
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      await axios.put(`${serverEndpoint}/api/items/${updatedItem._id}`, updatedItem, { withCredentials: true });
      setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
      setEditingItem(null);
      alert("Update successful!")
    } catch (error) {
      console.error('Error updating item', error);
      alert("Something went wrong!");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${serverEndpoint}/api/items/${id}`, { withCredentials: true });
      setItems(items.filter(item => item.id !== id));
      alert('Item deleted successfully!')
    } catch (error) {
      console.error('Error deleting item', error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className='bg-white p-10 rounded-lg my-5'>
        <h3 className="text-2xl">Welcome, {adminDetails.username}</h3>
        <p>Number of products:  <span className='text-3xl'>{items.length}</span></p>
      </div>
      <ItemForm addItem={addItem} updateItem={updateItem} editingItem={editingItem} />
      <ItemList items={items} editItem={setEditingItem} deleteItem={deleteItem} />
    </div>
  );
};

export default Dashboard;
