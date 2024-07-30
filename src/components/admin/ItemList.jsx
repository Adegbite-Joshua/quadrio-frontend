import React from 'react';

const ItemList = ({ items, editItem, deleteItem }) => {
  console.log(items);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className="mb-2 p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <img src={item.imageUrl} className='w-full h-32' alt="" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="text-gray-700">Price: ${item.price}</p>
                <div className="mt-2">
                  <h4 className="text-lg font-bold">User Ratings and Comments:</h4>
                  {/* Template for ratings and comments */}
                  {item?.ratingComments?.length > 0 && item?.ratingComments.map((ratingComment) => (
                    <div>
                      <p>Rating: {ratingComment.rating}/5</p>
                      <p>Comment: {ratingComment.comment}.</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button
                  onClick={() => editItem(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
