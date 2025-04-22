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
                            label="Nimi"
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
                            label="Sähköposti"
                            type="email"
                            name="email"
                            value={updatedProfile.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Yritys"
                            type="text"
                            name="yritys_nimi"
                            value={updatedProfile.yritys_nimi}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Puhelinnumero"
                            type="text"
                            name="phone_number"
                            value={updatedProfile.phone_number}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Y-tunnus"
                            type="text"
                            name="vat_number"
                            value={updatedProfile.vat_number}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Kaupunki"
                            type="text"
                            name="city"
                            value={updatedProfile.city}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Valtio"
                            type="text"
                            name="state"
                            value={updatedProfile.state}
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
                    <br />
                    <p>Yritys: {profile.yritys_nimi || "N/A"}</p>
                    <p>Osoite: {profile.address || "N/A"}</p>
                    <p>Y-tunnus: <strong>{profile.vat_number || "N/A"}</strong></p>
                    <p>Kaupunki: {profile.city || "N/A"}</p>
                    <p>Valtio: {profile.state || "N/A"}</p>
                    <p>Postinumero: {profile.postal_code || "N/A"}</p>
                    <p>Maa: {profile.country || "N/A"}</p>
                    <br />
                    <h6>Viimeksi päivitetty: <strong>{new Date(profile.updated_at).toLocaleString()}</strong></h6>
                    <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                        Muokkaa Profiilia
                    </button>
                    <CustomAlert message={alertMessage} />
                </>
            )}
        </section>
    );
};

export default UserProfile;