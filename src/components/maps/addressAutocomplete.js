import { useLoadScript } from '@react-google-maps/api';
import { useRef, useEffect } from 'react';

const libraries = ['places'];

const AddressAutocomplete = ({ value, onChange, onSelect }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (!inputRef.current || !window.google?.maps) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "fi" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const address = {
        address: "",
        postal_code: "",
        city: "",
        street: "",
      };

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("postal_code")) address.postal_code = component.long_name;
        if (types.includes("locality")) address.city = component.long_name;
        if (types.includes("route")) address.street = component.long_name;
        if (types.includes("street_number")) address.street += ` ${component.long_name}`;
      });

      address.address = address.street.split(" ")[0]; // or `address.street` for full

      onSelect(address);
    });
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Katuosoite"
      autoComplete="address-line1"
      value={value}
      onChange={onChange}
    />
  );
};

export default AddressAutocomplete;