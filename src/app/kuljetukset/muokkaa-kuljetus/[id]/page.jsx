'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { renderStepContent } from "@/components/forms/shipment-steps/renderStepContent";
import { useShipmentForm } from '@/lib/hooks/useShipmentForm';
import { steps } from 'src/components/forms/shipmentForm';
import '@/app/globals.css';
import { submitShipment } from '@/components/shipments/api/submitShipment';
import { lockShipmentForEditing, unlockShipmentAfterEdit, fetchShipmentData } from '@/components/shipments/api/shipmentActions';
import BackButton from '@/components/buttons/BackButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SubmitShipmentButton from '@/components/buttons/IconButton';

const EditShipment = () => {
  const {
    form,
    handleChange,
    handleNext,
    handleBack,
    handleSaveDraft,
    activeStep,
    autoFillFlags,
    handleAddressSelect,
    handleToggle
  } = useShipmentForm();
  const [shipmentData, setShipmentData] = useState(null);
  const [shipmentIdentifier, setShipmentIdentifier] = useState('');
  const [userID, setUserID] = useState('');
  const router = useRouter();
  const { id } = useParams(); 
  const [isSubmitting, setIsSubmitting] = useState('');
  
  const isFinalStep = activeStep === steps.length - 1;
  

  useEffect(() => {
    let isMounted = true;
    const getShipmentData = async () => {
      try {
        const fetchedData = await fetchShipmentData(id);
        if (isMounted) setShipmentData(fetchedData);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };
  
    if (id) getShipmentData();
  
    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    if (shipmentData) {
      lockShipmentForEditing(shipmentData.id);
    }
    return () => {
      if (shipmentData && shipmentData.id) {
        unlockShipmentAfterEdit(shipmentData.id);
      }
    };
  }, [shipmentData]);

 
  useEffect(() => {
    if (shipmentData) {
      // Only update the form if shipmentData is defined
      form.sender = shipmentData.sender || {};  // Default to empty object if undefined
      form.sender.address = shipmentData.sender_address || '';  // Default to empty string if undefined
      form.recipient = shipmentData.recipient || {};
      form.recipient.address = shipmentData.recipient_address || '';
      form.delivery.address = shipmentData.delivery_address || '';
      form.pickup = shipmentData.pickup || {};
      form.delivery = shipmentData.delivery || {};
      form.shipment = shipmentData.shipment || {};
      form.shipment.weight = shipmentData.weight || '';
      form.shipment.transport_units = shipmentData.transport_units || '';
      form.shipment.price = shipmentData.price || '';
      form.shipment.details = shipmentData.details || '';
      form.shipment.incoTerms = shipmentData.agreement_type || '';
    } else {
      // Handle the case where shipmentData is not yet available
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      form.pickup = { date: formattedDate };
    }
  }, [shipmentData, form]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (activeStep < steps.length - 1) {
      handleNext();
      return;
    }
    try {
      await submitShipment(form);
      toast.success('Ilmoitus julkaistu!');
      router.push('/kuljetukset');
    } catch (error) {
      toast.error(`Error submitting shipment: ${error.message}`);
      console.error(error);
    } finally {
      if (shipmentData?.id) {
        unlockShipmentAfterEdit(shipmentData.id);
      }
    }
  };

  useEffect(() => {
    document.title = 'Logistix | Muokkaa ilmoitus';
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-black-800">
        <h2 className="text-lg font-bold mb-4 text-white">Muokkaa Lähetystä</h2>


        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-2/4"
        >
          <div className="mb-4 flex justify-between items-center">
            {steps.map((label, index) => (
              <div key={label} className="text-center flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
                  ${activeStep >= index ? 'bg-blue-500' : 'bg-gray-400'}`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 ${activeStep >= index ? 'text-blue-500' : 'text-gray-300'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            
            {renderStepContent({
              step: activeStep,
              form,
              handleChange,
              autoFillFlags,
              handleToggle,
              handleAddressSelect
            })}
          </div>

          <div className="flex justify-between">
            <BackButton
              type="button"
              onClick={handleBack}
              disabled={activeStep === 0}
              className="disabled:opacity-50"
            >
              Takaisin
            </BackButton>
            <div className="flex gap-4">
              <SecondaryButton type="button" onClick={handleSaveDraft}>
                Tallenna luonnos
              </SecondaryButton>
              {!isFinalStep ? (
                <PrimaryButton type="button" onClick={handleNext} disabled={isSubmitting}>
                  {isSubmitting ? 'Lähetetään...' : 'Seuraava'}
                </PrimaryButton>
              ) : (
                <SubmitShipmentButton
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Lähetetään...' : 'Lähetä'}
                </SubmitShipmentButton>
              )}
            </div>
          </div>
        </form>

        <button
                type="button"
                onClick={() => unlockShipmentAfterEdit(id)}
                className="bg-transparent text-white border mt-4 px-4 py-2 rounded"
              >
                Peru muokkaus
              </button>
      </div>
    </Layout>
  );
};

export default EditShipment;