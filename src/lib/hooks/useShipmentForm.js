import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/supabaseClient';
import { useProfileData } from './useProfileData';
import { useFormAutofill } from './useFormAutofill';
import { shipmentForm } from '@/components/forms/shipmentForm';
import { flattenForm } from '../utils/flattenForm';

 export const useShipmentForm = () => {
  const router = useRouter();
  const { user, profile } = useProfileData();
  const [form, setForm] = useState(shipmentForm);
  const { autoFillFlags, handleToggle } = useFormAutofill(profile, form, setForm);
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (section, field) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [section]: { ...f[section], [field]: value } }));
  };

const handleAddressSelect = (type, data) => {
  setForm(prevState => ({
    ...prevState,
    [type]: {
      ...prevState[type],
      address: data.address,
      postal_code: data.postal_code,
      city: data.city,
      street: data.street,
    }
  }));
};

  useEffect(() => {
    console.log("Updated form:", form);
  }, [form]);

  const handleNext = () => setActiveStep((p) => p + 1);
  const handleBack = () => setActiveStep((p) => p - 1);

  const handleSaveDraft = async () => {
    if (!user) return toast.error('Käyttäjää ei löytynyt');
  
    setSubmitting(true);
  
    try {
      const draft = {
        user_id: user.id,
        shipment_identifier: uuidv4(),
        ...flattenForm(form, { allowIncomplete: true }),
        pickup_time: null,
        pickup_date: null,
        delivery_date: null,
        delivery_time: null,
        status: 'draft',
        updated_at: new Date().toISOString(),
      };
  
      const { error } = await supabase.from('shipments').upsert(draft);
      if (error) throw error;
  
      toast.success('Luonnos tallennettu');
        setTimeout(() => {
          router.push('/oma-tili');
        }, 3000);
    } catch (error) {
      toast.error('Virhe tallennuksessa');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    handleChange,
    handleNext,
    handleBack,
    handleSaveDraft,
    activeStep,
    autoFillFlags,
    handleToggle,
    handleAddressSelect,
  };
};