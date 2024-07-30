import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the item details based on the id
    // Here we use a hardcoded example, you can replace it with a fetch request
    const fetchedItem = { id: 1, name: 'Item 1', description: 'Description of Item 1', price: 10 };
    setItem(fetchedItem);

    // Fetch comments for the item
    // Replace this with a fetch request
    const fetchedComments = [
      { id: 1, rating: 4, comment: 'Great product!' },
      { id: 2, rating: 3, comment: 'Average quality.' },
    ];
    setComments(fetchedComments);
  }, [id]);

  const addComment = (comment) => {
    setComments([...comments, { ...comment, id: comments.length + 1 }]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {item && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p>{item.description}</p>
          <p className="text-gray-700">Price: ${item.price}</p>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="mb-4 p-4 bg-white rounded shadow">
            <p>Rating: {comment.rating}/5</p>
            <p>Comment: {comment.comment}</p>
          </div>
        ))}
      </div>
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default ItemDetails;
