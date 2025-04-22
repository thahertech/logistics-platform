'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { FaTruck, FaMapMarkerAlt, FaAddressBook } from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useUser from '@/lib/hooks/useUser';
import useFetchKuljetusById from '@/lib/hooks/useFetchShipmentById'; 
import useBuyShipment from '@/lib/hooks/useBuyShipment';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import BackButton from '@/components/buttons/BackButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';

const KuljetusSinglePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { kuljetus, loading, error } = useFetchKuljetusById(id);

  const { user, loading: userLoading, error: userError } = useUser();

  const isOwner = user?.id === kuljetus?.user_id;
  const { onBuyShipment } = useBuyShipment(kuljetus, isOwner);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen text-lg">Ladataan kuljetustietoja...</div>
      </Layout>
    );
  }

  if (!kuljetus) {
    return (
      <Layout>
        <div className="text-center p-8">
          <p className="text-lg mb-4">Kuljetusta ei löytynyt.</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => router.push('/kuljetukset')}>
            Takaisin
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-200">{kuljetus.pickup_postal_code}, {kuljetus.pickup_city} — {kuljetus.delivery_postal_code}, {kuljetus.delivery_city}</h1>
          <div className="flex gap-3">
            <BackButton
              onClick={() => router.push('/kuljetukset')}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:bg-gray-700"
            >
              Takaisin
            </BackButton>
            {isOwner ? (
              <SecondaryButton
                onClick={() => router.push(`/kuljetukset/muokkaa-kuljetus/${kuljetus.id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                Muokkaa
              </SecondaryButton>
            ) : (
              <PrimaryButton
                onClick={onBuyShipment}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                Osta
              </PrimaryButton>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
        <motion.div
  className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105"
  whileHover={{ scale: 1.02 }}
>
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-400"><FaMapMarkerAlt /> Nouto</h2>
            <p><strong>Osoite:</strong> {kuljetus.pickup_postal_code}, {kuljetus.pickup_city}</p>
            <p><strong>Aika:</strong> {new Date(kuljetus.pickup_date).toLocaleString('fi-FI', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </motion.div>

          <motion.div
              className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-400"><FaMapMarkerAlt /> Toimitus</h2>
            <p><strong>Osoite:</strong> {kuljetus.delivery_postal_code}, {kuljetus.delivery_city}</p>
            <p><strong>Aika:</strong> {new Date(kuljetus.delivery_date).toLocaleString('fi-FI', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.02 }}
          >
<h2 className="text-xl font-bold flex items-center gap-2 text-gray-400">
  <FaTruck aria-hidden="true" /> Kuljetuksen Tiedot
</h2>            <div className="flex justify-end mb-6">
              <span className="text-xl text-green-400 font-semibold bg-white/10 px-4 py-2 rounded-xl shadow-inner">
              {kuljetus.amount?.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' })}              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6 text-xs">
              <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full font-medium">
                {kuljetus.weight} kg
              </span>
              <span className="bg-purple-400/20 text-purple-300 px-3 py-1 rounded-full font-medium">
                {kuljetus.transport_units} x {kuljetus.unit_type}
              </span>
              <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full font-medium">
                {kuljetus.agreement_type}
              </span>
            </div>
            <p><strong>Lisätiedot:</strong> {kuljetus.details || 'Ei lisätietoja.'}</p>
          </motion.div>

          <motion.div
              className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
            >
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-400"><FaAddressBook /> Lähettäjän Tiedot</h2>
            <p><strong>Yritys:</strong> {kuljetus.sender_name}</p>
            <p><strong>Puhelin:</strong> {kuljetus.sender_phone}</p>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default KuljetusSinglePage;