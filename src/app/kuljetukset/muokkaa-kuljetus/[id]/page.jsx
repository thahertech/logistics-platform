'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { renderStepContent } from "@/components/forms/shipment-steps/renderStepContent";
import { useShipmentForm } from '@/lib/hooks/useShipmentForm';
import { steps } from 'src/components/forms/shipmentForm';
import { submitShipment } from '@/components/shipments/api/submitShipment';
import { lockShipmentForEditing, unlockShipmentAfterEdit, fetchShipmentData } from '@/components/shipments/api/shipmentActions';
import BackButton from '@/components/buttons/BackButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SubmitShipmentButton from '@/components/buttons/IconButton';
import Stepper from '@/components/forms/shipment-steps/Stepper';

const ShipmentForm = () => {
  const {
    form,
    setForm,
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
  const router = useRouter();
  const { id } = useParams();  // Check if there's an id for editing
  const [isSubmitting, setIsSubmitting] = useState('');
  const isFinalStep = activeStep === steps.length - 1;

  // Fetch shipment data if it's an edit operation
  useEffect(() => {
    let isMounted = true;
    const getShipmentData = async () => {
      if (id) {
        try {
          const fetchedData = await fetchShipmentData(id);
          if (isMounted) setShipmentData(fetchedData);
          console.log("Fetched shipment data:", fetchedData);
        } catch (error) {
          console.error("Error fetching shipment data:", error);
        }
      }
    };
  
    getShipmentData();
    return () => { isMounted = false; };
  }, [id]);

  // Lock/unlock shipment for editing
  useEffect(() => {
    if (shipmentData) {
      lockShipmentForEditing(shipmentData.id);
    }
    return () => {
      if (shipmentData?.id) {
        unlockShipmentAfterEdit(shipmentData.id);
      }
    };
  }, [shipmentData]);

  // Populate the form with existing data (if it's an edit)
  useEffect(() => {
    if (!shipmentData) return;

    const filledForm = {
      sender: {
        ...shipmentData.sender,
        name: shipmentData.sender_name || '',
        vat_number: shipmentData.vat_number || '',
        email: shipmentData.sender_email || '',
        address: shipmentData.sender_address || '',
        postal_code: shipmentData.sender_postal_code || '',
        city: shipmentData.sender_city || '',
        phone: shipmentData.sender_phone || '',
      },
      recipient: {
        ...shipmentData.recipient,
        name: shipmentData.recipient_name || '',
        email: shipmentData.recipient_email || '',
        address: shipmentData.recipient_address || '',
        postal_code: shipmentData.recipient_postal_code || '',
        city: shipmentData.recipient_city || '',
        phone: shipmentData.recipient_phone || '',
      },
      pickup: {
        ...shipmentData.pickup,
        date: shipmentData.pickup_date ? dayjs(shipmentData.pickup_date).format('YYYY-MM-DD') : '',
        time: shipmentData.pickup_time || '',
        address: shipmentData.pickup_address || '',
        postal_code: shipmentData.pickup_postal_code || '',
        city: shipmentData.pickup_city || '',
      },
      delivery: {
        ...shipmentData.delivery,
        date: shipmentData.delivery_date ? dayjs(shipmentData.delivery_date).format('YYYY-MM-DD') : '',
        time: shipmentData.delivery_time || '',      
        address: shipmentData.delivery_address || '',
        postal_code: shipmentData.delivery_postal_code || '',
        city: shipmentData.delivery_city || '',
      },
      shipment: {
        weight: shipmentData.weight || '',
        transportUnits: shipmentData.transport_units || '',
        unitType: shipmentData.unit_type || '',
        price: shipmentData.price || '',
        details: shipmentData.details || '',
        incoTerms: shipmentData.agreement_type || '',
      }
    };
  
    setForm(filledForm);
  }, [shipmentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (activeStep < steps.length - 1) {
      handleNext();
      return;
    }

    try {
      if (id) {
        // If editing, update the shipment
        await submitShipment(form, id);
        toast.success('Ilmoitus päivitetty!');
      } else {
        // If creating a new shipment
        await submitShipment(form);
        toast.success('Ilmoitus julkaistu!');
      }
      router.push('/kuljetukset');
    } catch (error) {
      toast.error(`Error submitting shipment: ${error.message}`);
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = id ? 'Logistix | Muokkaa ilmoitus' : 'Logistix | Luo uusi ilmoitus';
  }, [id]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-black-800">
        <h2 className="text-lg font-bold mb-4 text-white">{id ? 'Muokkaa Lähetystä' : 'Luo Uusi Lähetys'}</h2>

        <form onSubmit={(e) => e.preventDefault()} className="bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-2/3">

         <Stepper steps={steps} activeStep={activeStep} />

          <div className="mb-6">
            {renderStepContent({
              step: activeStep,
              form,
              handleChange,
              autoFillFlags,
              handleToggle,
              handleAddressSelect,
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
          onClick={() => router.push('/kuljetukset')}
          className="bg-transparent text-white border mt-4 px-4 py-2 rounded"
        >
          Peruuta
        </button>
      </div>
    </Layout>
  );
};

export default ShipmentForm;