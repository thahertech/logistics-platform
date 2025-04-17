import React, { useState } from "react";
import styles from "@/app/Styles/profile.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import BackButton from "../buttons/BackButton";
import GoogleAddressAutocomplete from "./GoogleAddressAutocomplete";


const InputField = ({ label, type, name, value,  readOnly = false, onChange, className = ""}) => (
    <label className={styles.inputLabel}>
        {label}
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            readOnly={readOnly}
            className={`${styles.inputField} ${readOnly ? styles.readOnlyInput : ""} ${className}`}
        />
    </label>
);

const UserProfile = ({ profile, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (JSON.stringify(updatedProfile) !== JSON.stringify(profile)) {
            await onProfileUpdate(updatedProfile);
            setUpdatedProfile(updatedProfile);
            setIsEditing(false);
        }
        console.log(updatedProfile);
    };

    const handleCancel = () => {
        setUpdatedProfile(profile);
        setIsEditing(false);
    };

    const isSaveDisabled = JSON.stringify(updatedProfile) === JSON.stringify(profile);

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <section className={styles.profileDetails}>
            
            {isEditing ? (
                <>
                    <div className={styles.profileForm}>
                        <InputField
                            label="Koko nimi"
                            type="text"
                            name="full_name"
                            value={updatedProfile.full_name}
                            onChange={handleChange}
                        />
                         <InputField
                            label="Sähköposti"
                            type="email"
                            name="email"
                            value={updatedProfile.email}
                            onChange={handleChange}
                        />
                            <InputField
                            label="Puhelinnumero"
                            type="text"
                            name="phone_number"
                            value={updatedProfile.phone_number}
                            onChange={handleChange}
                        />
                    
    <label htmlFor="user_role">Valitse rooli</label>
    <select
        name="user_role"
        value={updatedProfile.user_role}
        onChange={handleChange}
        className={styles.selectField}>

        <option value="lähettäjä">Lähettäjä</option>
        <option value="kuljettaja">Kuljettaja</option>
    </select>
    </div>
    <div className={styles.inputField2}>
                     
                        <InputField
                            label="Yritys"
                            type="text"
                            name="yritys_nimi"
                            value={updatedProfile.yritys_nimi}
                            readOnly
                        />

                        <InputField
                            label="Y-tunnus"
                            type="text"
                            name="vat_number"
                            value={updatedProfile.vat_number}
                            readOnly
                        />
                       <GoogleAddressAutocomplete
                                value={updatedProfile.address}
                                onSelect={(selectedAddress) => {
                                    console.log(selectedAddress);

                                    const addressParts = selectedAddress.address.split(','); // Split by comma to separate address components
                                    const streetAddress = addressParts[0].trim(); // The first part is typically the street address

                                    setUpdatedProfile(prev => ({
                                        ...prev,
                                        address: streetAddress,  // Only set the street address (first line)
                                        postal_code: selectedAddress.postal_code,
                                        city: selectedAddress.city,
                                        country: selectedAddress.country
                                    }));
                                }}
                            />
                        <InputField
                            label="Kaupunki"
                            type="text"
                            name="city"
                            value={updatedProfile.city}
                            onChange={handleChange}
                        />
                        
                        <InputField
                            label="Postinumero"
                            type="text"
                            name="postal_code"
                            value={updatedProfile.postal_code}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Maa"
                            type="text"
                            name="country"
                            value={updatedProfile.country}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Verkkosivut"
                            type="text"
                            name="website"
                            value={updatedProfile.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.actionButtons}>

                        <BackButton
                            type="button"
                            onClick={handleCancel}
                            className={styles.btnBack}
                        >
                            Takaisin
                        </BackButton>

                        <PrimaryButton
                            type="button"
                            onClick={handleSave}
                            className={styles.btnSave}
                        >
                            Tallenna
                        </PrimaryButton>

                    </div>
                </>
            ) : (
                <>
                    <div className={styles.profileHeader}>

                    <div className={styles.profileItems}>
                    <h3>{profile.full_name}</h3>

                    <h4> <strong>{profile.email || "N/A"}</strong></h4>
                    <p>  <strong>{profile.phone_number || "N/A"}</strong></p>
                    <br />
                    </div>
                    <h5><strong>{profile.user_role|| "N/A"}</strong></h5>

                    <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                        Muokkaa Profiilia
                    </button>
                    </div>
                    <div className={styles.companyItems}>
                    <p><strong>{profile.yritys_nimi || "N/A"} {profile.vat_number || "N/A"}</strong></p>

                    <p>{profile.address || "N/A"}</p>
                    </div>
                    <br />
                    <h6>Viimeksi päivitetty  <strong>{new Date(profile.updated_at).toLocaleString()}</strong></h6>
                    </>
            )}
        </section>
    );
};

export default UserProfile;