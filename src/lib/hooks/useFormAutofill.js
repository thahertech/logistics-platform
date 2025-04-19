import { useState } from 'react';

export const useFormAutofill = (profile, form, setForm) => {
  const [autoFillFlags, setAutoFillFlags] = useState({
    useSenderProfileDetails: false,
    usePickupProfileDetails: false,
    sameAsRecipient: true,
  });

  const handleToggle = (key) => () => {
    setAutoFillFlags((prev) => {
      const updated = { ...prev, [key]: !prev[key] };

      if (profile && !prev[key]) {
        if (key === 'useSenderProfileDetails') {
          setForm(f => ({
            ...f,
            sender: {
              ...f.sender,
              name: profile.full_name || '',
              vat_number: profile.vat_number || '',
              phone: profile.phone_number || '',
              email: profile.email || '',
              address: profile.address || '',
              city: profile.city || '',
              postal_code: profile.postal_code || '',
            }
          }));
        }

        if (key === 'usePickupProfileDetails') {
          setForm(f => ({
            ...f,
            pickup: {
              ...f.pickup,
              contact: profile.full_name || '',
              phone: profile.phone_number || '',
              email: profile.email || '',
              address: profile.address || '',
              city: profile.city || '',
              postal_code: profile.postal_code || '',
            }
          }));
        }

        if (key === 'sameAsRecipient') {
          setForm(f => ({
            ...f,
            recipient: {
              ...f.recipient,
              phone: profile.phone_number || '',
              email: profile.email || '',
              address: profile.address || '',
              city: profile.city || '',
              postal_code: profile.postal_code || '',
            }
          }));
        }
      }

      return updated;
    });
  };

  return { autoFillFlags, handleToggle };
};