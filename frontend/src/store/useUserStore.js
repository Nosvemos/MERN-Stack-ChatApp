import { create } from 'zustand';
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useUserStore = create((set) => ({
	isUpdatingProfile: false,

	updateProfile: async(data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.put('/user/update-profile', data);
			set({ authUser: res.data });
			toast.success('Profile updated successfully.');
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isUpdatingProfile: false });
		}
	}
}));