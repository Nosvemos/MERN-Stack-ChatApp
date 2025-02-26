import { create } from 'zustand';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import { axiosInstance } from "../lib/axios.js";

const baseUrl = 'http://localhost:5001';

export const useAuthStore = create((set, get) => ({
	authUser: null,

	isSigningUp: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,

	isCheckingAuth: true,

	checkAuth: async() => {
		try {
			const res = await axiosInstance.get('/auth/check');
			await get().connectSocket();
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
			await get().connectSocket();
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
			await get().disconnectSocket();
			set({ authUser: null });
			toast.success('Logged out successfully.');
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingOut: false });
		}
	},

	connectSocket: async() => {
		const { authUser } = get();
		if(!authUser || get().socket?.connected) return;

		const socket = io(baseUrl, {
			query: {
				userId: authUser._id,
			}
		});
		socket.connect();
		set({ socket });

		socket.on('getOnlineUsers', (userIds) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: async() => {
		if(get().socket?.connected) get().socket.disconnect();
	}
}));