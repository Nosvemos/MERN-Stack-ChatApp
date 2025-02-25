import User from '../models/user.model.js';
import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userId = req.user._id;

		if(!profilePic) {
			return res.status(400).json({error: 'Profile picture not found'});
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePic);
		if(!uploadResponse) {
			return res.status(500).json({error: 'Profile picture service is not giving response.'});
		}

		const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

		res.status(200).json(updatedUser);

	} catch (error) {
		console.log('Error in updating profile', error);
		res.status(500).json({message: 'Internal Server Error'});
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log('Error in checkAuth controller', error.message);
		res.status(500).json({message: 'Internal Server Error'});
	}
};