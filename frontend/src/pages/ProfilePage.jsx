import { useState } from "react";

import { Camera, User, Mail } from 'lucide-react'
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import { useUserStore } from "../store/useUserStore.js";

const ProfilePage = () => {
	const { authUser } = useAuthStore();
	const { isUpdatingProfile, updateProfile } = useUserStore();
	const [selectedImage, setSelectedImage] = useState(null);
	const handleImageUpload = async(e) => {
		const file = e.target.files[0];
		if(!file) return;

		if(!file.type.startsWith("image/")) {
			toast.error("Please select an image file.");
			e.target.value = "";
			return;
		}
		// Check file size - 10MB
		const maxSize = 10 * 1024 * 1024;

		if(file.size > maxSize) {
			toast.error("Image size is too big! No larger than 10MB.");
			e.target.value = "";
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async() => {
			const base64Image = reader.result;
			setSelectedImage(base64Image);
			await updateProfile({ profilePic: base64Image });
		}

	}
	return (
		<div className='h-screen pt-20'>
			<div className='max-w-2xl mx-auto p-4 py-8'>
				<div className='bg-base-300/20 rounded-xl p-6 space-y-8 shadow-md'>
					<div className="text-center">
						<h1 className="text-2xl text-primary font-semibold">Profile</h1>
						<p className="mt-2">Your profile information</p>
					</div>
					{/* Image upload section */}
					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<img
								src={selectedImage || authUser.profilePic || "/avatar.png"}
								alt="Profile"
								className="size-32 rounded-full object-cover"
							/>
							<label htmlFor="avatar-upload"
								className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
                        p-2 rounded-full cursor-pointer transition-all duration-200
                        ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""} `} >
								<Camera className="w-5 h-5 text-base-200" />
								<input type="file" id="avatar-upload"
									className="hidden" accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>
						<p className="text-sm">
							{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
						</p>
					</div>

					{/* Full name and email section */}
					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="text-sm text-primary flex items-center gap-2">
								<User className="w-4 h-4" />
								Full Name
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg shadow-lg border border-primary">{authUser?.fullName}</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-primary flex items-center gap-2">
								<Mail className="w-4 h-4" />
								Email Address
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg shadow-lg border border-primary">{authUser?.email}</p>
						</div>
					</div>

					{/* Account information section */}
					<div className="mt-6 bg-base-300/50 rounded-xl shadow-lg p-6">
						<h2 className="text-lg text-primary font-medium mb-4">Account Information</h2>
						<div className="space-y-2 text-sm">
							<div className="flex items-center justify-between py-1">
								<span>Member Since</span>
								<span className='text-primary'>{authUser.createdAt?.split("T")[0]}</span>
							</div>
							<div className="flex items-center justify-between py-1">
								<span>Account Status</span>
								<span className="text-primary">Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;