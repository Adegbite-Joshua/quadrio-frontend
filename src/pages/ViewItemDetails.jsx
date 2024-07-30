import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { serverEndpoint } from '../constants/server';
import CommentForm from '../components/user/CommentForm'
import Footer from '../components/Footer/Footer';
import Navbar from '../components/navbar/Navbar';


const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${serverEndpoint}/api/items/${id}`);
                const fetchedItem = response.data;
                setItem(fetchedItem);
                setComments(fetchedItem.ratingComments);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    const addComment = async (comment) => {
        try {
            const response = await axios.post(`${serverEndpoint}/api/items/${id}/rating-comment`, comment);
            setComments([...comments, comment]);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                {item && (
                    <div className="mb-8">
                        <img src={item.imageUrl} className='w-full h-32' alt="" />
                        <h1 className="text-3xl font-bold">{item.name}</h1>
                        <p>{item.description}</p>
                        <p className="text-gray-700">Price: ${item.price}</p>
                    </div>
                )}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {comments.map((comment) => (
                        <div key={comment._id} className="mb-4 p-4 bg-white rounded shadow">
                            <p>User: {comment.user}</p>
                            <p>Rating: {comment.rating}/5</p>
                            <p>Comment: {comment.comment}</p>
                        </div>
                    ))}
                </div>
                <CommentForm addComment={addComment} />
            </div>
            <Footer />
        </>
    );
};

export default ItemDetails;
