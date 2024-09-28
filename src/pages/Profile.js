import React, { useState } from 'react';
import Layout from '@/app/dashboard/Layout';
import '../app/globals.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, phone, address });
  };

  return (
    <Layout>
 <div
        className="flex justify-center items-center h-screen bg-gray-200"
        style={{
          backgroundImage: 'url("assets/TruckImg.jpeg")', // Update with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl text-gray-700 font-bold mb-6 text-center">Profiili</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nimi</label>
            <input
              type="text"
              placeholder="Syötä nimesi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Sähköposti</label>
            <input
              type="email"
              placeholder="Syötä sähköpostiosoitteesi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Puhelin</label>
            <input
              type="tel"
              placeholder="Syötä puhelinnumerosi"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Osoite</label>
            <input
              type="text"
              placeholder="Syötä osoitteesi"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Tallenna
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
