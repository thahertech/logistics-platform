import UserProfile from '@/app/Components/UserProfile';

const ProfileContent = ({ profile, onProfileUpdate }) => {

    return (
    <div>

      <UserProfile profile={profile} onProfileUpdate={onProfileUpdate} />
    </div>
  );
};

export default ProfileContent;