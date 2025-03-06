import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Profile from "./Profile";

const ProfileContainer = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      setSelectedImage(base64Image);

      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <Profile
      authUser={authUser}
      isUpdatingProfile={isUpdatingProfile}
      updateProfile={updateProfile}
      selectedImage={selectedImage}
      handleImageUpload={handleImageUpload}
    />
  );
};

export default ProfileContainer;
