import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient'; // Ensure you have your Supabase client configured
import RatingCard from '../Components/ratingCards';  // Import the RatingCard component
import '@/app/globals.css'

const Ratings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data, error } = await supabase
        .from('palautteet')
        .select('*')
        .order('created_at', { ascending: false }); // Order by most recent ratings

      if (error) {
        console.error('Error fetching ratings:', error);
      } else {
        setRatings(data);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen">
      <h2 className="text-3xl text-white font-bold mb-6">Palautteet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default Ratings;
