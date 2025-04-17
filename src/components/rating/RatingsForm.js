import React from 'react';
import { useForm } from 'react-hook-form';

const RatingsForm = ({ onSubmit, selectedOrder }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <div>
            <h3 className="text-xl font-bold">Arvioi toimitus</h3>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-4">
                    <label className="block">Rating</label>
                    <input
                        type="number"
                        {...register('rating', { required: true, min: 1, max: 5 })}
                        className="p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Comment</label>
                    <textarea {...register('comment')} className="p-2 rounded bg-gray-700 text-white" />
                </div>
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RatingsForm;