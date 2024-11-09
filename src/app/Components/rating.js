import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RatingForm.css';

const RatingForm = ({ onRatingSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://truckup.local/wp-json/wp/v2/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserId(response.data.id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setErrorMessage('Failed to fetch user details. Please try again.');
            }
        };

        fetchUserId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `http://truckup.local/wp-json/custom/v1/rate-user`,
                {
                    rated_user_id: userId,
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage('Rating submitted successfully!');

            if (onRatingSubmitted) {
                onRatingSubmitted({ rating, comment });
            }

            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting rating', error);
            setMessage('Failed to submit rating. Please try again.');
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={starValue}
                    className={`star ${starValue <= rating ? 'filled' : ''}`}
                    onClick={() => handleStarClick(starValue)}
                >
                    ★
                </span>
            );
        });
    };

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="star-rating">
                    {renderStars()}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    required
                />
                <button type="submit">Submit Rating</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default RatingForm;
