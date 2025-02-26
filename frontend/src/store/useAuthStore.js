import { create } from 'zustand';
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
	authUser: null,

	isSigningUp: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isUpdatingProfile: false,

	isCheckingAuth: true,

	checkAuth: async() => {
		try {
			const res = await axiosInstance.get('/auth/check');
			set({ authUser: res.data });
		} catch (error) {
			console.error('Error in checkAuth:', error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async(data) => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post('/auth/signup', data);
			set({ authUser: res.data });
			toast.success('Account created successfully.');
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async(data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post('/auth/login', data);
			set({ authUser: res.data });
			toast.success('Logged-in successfully.');
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async() => {
		set({ isLoggingOut: true });
		try {
			await axiosInstance.post('/auth/logout');
			set({ authUser: null });
			toast.success('Logged out successfully.');
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingOut: false });
		}
	},

	updateProfile: async(data) => {

	}
}));