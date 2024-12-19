import React, { useState } from "react";
import styles from "@/app/Styles/profile.module.css";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onProfileUpdate(updatedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setUpdatedProfile(profile);
        setIsEditing(false);
    };

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
                            label="Username"
                            type="text"
                            name="username"
                            value={updatedProfile.username}
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
                        <button onClick={handleSave} className={styles.btnSave}>
                            Save
                        </button>
                        <button onClick={handleCancel} className={styles.btnCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2>{profile.full_name || "N/A"}</h2>
                    <p>Email: {profile.email || "N/A"}</p>
                    <p>Company: {profile.yritys_nimi || "N/A"}</p>
                    <p>Phone: {profile.phone_number || "N/A"}</p>
                    <p>VAT Number: {profile.vat_number || "N/A"}</p>
                    <p>Last updated: {new Date(profile.profile_updated_at).toLocaleString()}</p>
                    <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                        Edit Profile
                    </button>
                </>
            )}
        </section>
    );
};

export default UserProfile;