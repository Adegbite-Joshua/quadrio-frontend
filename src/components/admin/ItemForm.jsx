import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../../constants/server';

const ItemForm = ({ addItem, updateItem, editingItem }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setId(editingItem._id)
      setDescription(editingItem.description);
      setPrice(editingItem.price);
      setImageBase64(editingItem.imageUrl || '');
    }
  }, [editingItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageBase64('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
      imageBase64,
    };

    try {
      if (editingItem) {
        await updateItem({...formData, _id: id});
      } else {
        await addItem(formData);
      }
      setName('');
      setDescription('');
      setPrice('');
      setImageBase64('');
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{editingItem ? 'Edit Item' : 'Add Item'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {editingItem ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
