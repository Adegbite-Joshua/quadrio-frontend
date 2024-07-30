import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ user, rating, comment });
    setUser('');
    setRating('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Comment</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
          User
        </label>
        <input
          id="user"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
