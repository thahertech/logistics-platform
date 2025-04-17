import React from 'react';

const RatingCard = ({ rating }) => {
  const stars = Array(rating.rating).fill('★');
  const emptyStars = Array(5 - rating.rating).fill('☆');

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <p className="mt-2">{rating.feedback_content}</p>
      <div className="flex mt-2">
        {stars.map((star, index) => (
          <span key={index} className="text-yellow-500">{star}</span>
        ))}
        {emptyStars.map((star, index) => (
          <span key={index + stars.length} className="text-gray-500">{star}</span>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-500">Julkaistu: {new Date(rating.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default RatingCard;
