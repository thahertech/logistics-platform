import React, { useState } from "react";
import styles from "@/app/Styles/profile.module.css";
import CustomAlert from '@/app/Components/alert-box/profile-alert';

const InputField = ({ label, type, name, value, onChange }) => (
    <label className={styles.inputLabel}>
        {label}:
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={styles.inputField}
        />
    </label>
);

const UserProfile = ({ profile, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const [alertMessage, setAlertMessage] = useState('');  // Add state for alert message
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Check if there are changes before saving
        if (JSON.stringify(updatedProfile) !== JSON.stringify(profile)) {
            await onProfileUpdate(updatedProfile);  // Ensure profile update happens correctly
            setIsEditing(false);  // Disable editing mode

        }
        console.log(updatedProfile);
    };

    const handleCancel = () => {
        setUpdatedProfile(profile);  // Reset to the original profile values
        setIsEditing(false);  // Disable editing mode
    };

    const isSaveDisabled = JSON.stringify(updatedProfile) === JSON.stringify(profile);  // Disable save button if no changes

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <section className={styles.profileDetails}>
            {isEditing ? (
                <>
                    <div className={styles.profileForm}>
                        <InputField
                            label="Full Name"
                            type="text"
                            name="full_name"
                            value={updatedProfile.full_name}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Käyttäjärooli"
                            type="text"
                            name="user_role"
                            value={updatedProfile.user_role}
                            onChange={handleChange}
                        />
                         <InputField
                            label="Osoite"
                            type="text"
                            name="address"
                            value={updatedProfile.address}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={updatedProfile.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Company"
                            type="text"
                            name="yritys_nimi"
                            value={updatedProfile.yritys_nimi}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Phone"
                            type="text"
                            name="phone_number"
                            value={updatedProfile.phone_number}
                            onChange={handleChange}
                        />
                        <InputField
                            label="VAT Number"
                            type="text"
                            name="vat_number"
                            value={updatedProfile.vat_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.actionButtons}>
                        <button onClick={handleSave} className={styles.btnSave} disabled={isSaveDisabled}>
                            Tallenna
                        </button>
                        <button onClick={handleCancel} className={styles.btnCancel}>
                            Peru
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2><strong>{profile.full_name || "N/A"}</strong></h2>
                    <h4>Käyttäjärooli: <strong>{profile.user_role || "N/A"}</strong></h4>
                    <p>Sähköposti: <strong>{profile.email || "N/A"}</strong></p>
                    <p>Puhelinnumero: <strong>{profile.phone_number || "N/A"}</strong></p>
                    <br/>
                    <p>Yritys: {profile.yritys_nimi || "N/A"}</p>
                    <p>Osoite: {profile.address || "N/A"}</p>
                    <p>Y-tunnus: <strong>{profile.vat_number || "N/A"}</strong></p>
                    <br/>
                    <h6>Viimeksi päivitetty: <strong>{new Date(profile.updated_at).toLocaleString()}</strong></h6>
                    <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                        Muokkaa Profiilia
                    </button>
                    <CustomAlert message={alertMessage} />
                    <style jsx>{`
        /* Alert box container */
        .custom-alert {
            position: fixed;
            top: 20%;
            right: 20%;
            background-color: #4CAF50;  /* Green color for success */
            color: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            font-size: 14px;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
            z-index: 9999;
        }

        /* Style when alert is visible */
        .custom-alert.show {
            opacity: 1;
        }
      `}</style>
      
                </>
            )}
        </section>
    );
};

export default UserProfile;