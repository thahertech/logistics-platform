'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { steps } from "@/components/forms/shipmentForm";
import { renderStepContent } from "@/components/forms/shipment-steps/renderStepContent";
import { useShipmentForm } from '@/lib/hooks/useShipmentForm';
import '@/app/globals.css';
import TopHeader from '@/components/Layout/TopHeader';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SubmitShipmentButton from '@/components/buttons/IconButton';
import BackButton from '@/components/buttons/BackButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import ShipmentSidebar from '@/components/checkout/sidebar';
import LShipmentSidebar from '@/components/checkout/sidebar-left';
import { ROUTES } from '@/constants/routes';
import { submitShipment } from '@/components/shipments/api/submitShipment';
import Stepper from '@/components/forms/shipment-steps/Stepper';

const CreateShipment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, handleChange, handleNext, handleBack, handleSaveDraft, activeStep, autoFillFlags, handleToggle, handleAddressSelect } = useShipmentForm();
  const router = useRouter();
  const params = useParams();
  const isFinalStep = activeStep === steps.length - 1;

  useEffect(() => {
    if (params?.id) {
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFinalStep) {
      toast.error("Ei voi lähettää ennen viimeistä vaihetta.");
      return;
    }
  
    setIsSubmitting(true);
  
    if (!form.sender.name || !form.recipient.name) {
      toast.error("Täytä kaikki pakolliset kentät ennen lähetystä.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      await submitShipment(form);
      toast.success('Ilmoitus julkaistu!');
      router.push(ROUTES.MY_ACCOUNT);
    } catch (error) {
      console.error(error);
      toast.error(`Virhe: ${error.message || 'Tuntematon virhe'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
      document.title = 'Logistix | Luo ilmoitus';
    }, []);

  return (
    <>
      <TopHeader />
      <div className="position-sticky align-items-center justify-end flex">
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-black-800">
        <h2 className="text-lg font-bold mb-4 text-white">Luo uusi Lähetys</h2>
      
        <form onSubmit={(e) => e.preventDefault()} className="bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-1/3">
        <Stepper steps={steps} activeStep={activeStep} />

          <div className="mb-6">
            {renderStepContent({
              step: activeStep,
              form,
              handleChange,
              handleToggle,
              autoFillFlags,
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
        <ShipmentSidebar pickup={form.pickup} delivery={form.delivery} />
      </div>    
    </>
  );
};

export default CreateShipment;