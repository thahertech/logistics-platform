'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateShipmentClient = ({ initialData }) => {
  const [sessionData, setSessionData] = useState(initialData);
  const [form, setForm] = useState({
    sender: {},
    recipient: {},
    shipment: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      router.push('/auth/login'); // Redirect if no session data
    }
  }, [sessionData, router]);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to submit shipment');
      toast.success('Shipment created successfully!');
      router.push('/oma-tili');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create Shipment</h1>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs go here, using `handleChange` for input changes */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateShipmentClient;