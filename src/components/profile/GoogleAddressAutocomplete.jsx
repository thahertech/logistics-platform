// components/GoogleAddressAutocomplete.jsx
import { useEffect, useRef, useCallback } from "react";

const GoogleAddressAutocomplete = ({ value, onSelect }) => {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);

    // Move the initialization inside the useEffect to avoid stale closure issues
    useEffect(() => {
        const loadScript = (url, callback) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = true;
            script.onload = callback;
            document.head.appendChild(script);
        };

        const initializeAutocomplete = () => {
            if (!inputRef.current) return;

            autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
                componentRestrictions: { country: "fi" },
            });

            autocompleteRef.current.setFields(["address_component", "formatted_address"]);
            autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
        };


            initializeAutocomplete();

    }, []);

    // Move `handlePlaceSelect` outside of `useCallback` to avoid unnecessary re-renders
    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        const address = {
            address: place.formatted_address,
            city: "",
            postal_code: "",
            country: ""
        };

        place.address_components.forEach(component => {
            const types = component.types;

            if (types.includes("postal_code")) {
                address.postal_code = component.long_name;
            }
            if (types.includes("locality")) {
                address.city = component.long_name;
            }
            if (types.includes("country")) {
                address.country = component.long_name;
            }
        });

        onSelect(address);
    };

    return (
        <label>
            <span className="text-white mb-2 text-bold p-2">Osoite</span>
            <input
                ref={inputRef}
                type="text"
                defaultValue={value}
                placeholder="Syötä osoite"
                className="bg-black text-white border border-gray-600 rounded-md p-4 w-full mb-4"
            />
        </label>
    );
};

export default GoogleAddressAutocomplete;