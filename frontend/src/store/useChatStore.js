import { create } from 'zustand';
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
}));