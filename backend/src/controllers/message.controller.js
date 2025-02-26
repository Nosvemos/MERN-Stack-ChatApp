import User from '../models/user.model.js';
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error('Error in getUsersForSidebar', error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const currentUserId = req.user._id;

		const messages = await Message.find({
			$or: [
				{
					senderId: currentUserId,
					receiverId: userToChatId
				},
				{
					senderId: userToChatId,
					receiverId: currentUserId
				}
			]
		});

		res.status(200).json(messages);
	} catch (error) {
		console.error('Error in getMessages', error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		if (!text && !image) {
			return res.status(400).json({ error: "Message must contain text or an image." });
		}

		const receiver = await User.findById(receiverId);
		if (!receiver) {
			return res.status(404).json({ error: "Receiver not found." });
		}

		let imageUrl;
		if (image) {
			try {
				const uploadResponse = await cloudinary.uploader.upload(image);
				imageUrl = uploadResponse.secure_url;
			} catch (error) {
				return res.status(400).json({ error: "Failed to upload image." });
			}
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl
		});

		await newMessage.save();

		const receiverSocketId = await getReceiverSocketId(receiverId);
		if(receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error('Error in sendMessage', error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};