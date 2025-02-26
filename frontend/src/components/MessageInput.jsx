import {useRef, useState} from "react";

import { toast } from 'react-toastify';
import { Send, Image, X } from 'lucide-react';

import {useChatStore} from "../store/useChatStore.js";

const MessageInput = () => {
	const [text, setText] = useState('');
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);
	const { sendMessage } = useChatStore();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if(!file.type.startsWith("image/")) {
			toast.error("Please select an image file.");
			return;
		}

		const maxSize = 10 * 1024 * 1024;
		if(file.size > maxSize) {
			toast.error("Image size is too big! No larger than 10MB.");
			e.target.value = "";
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const removeImage = () => {
		setImagePreview(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleSendMessage = async(e) => {
		e.preventDefault();

		if(!text.trim() && !imagePreview) {
			toast.error("You can't send blank message.");
			return;
		}

		try {
			await sendMessage({
				text: text.trim(),
				image: imagePreview,
			});

			setText("");
			removeImage();
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	}

	return (
		<div className='p-4 w-full'>
			{imagePreview && (
				<div className="mb-3 flex items-center gap-2">
					<div className="relative">
						<img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700"/>
						<button onClick={removeImage}
							className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
							type="button">
							<X className="size-3" />
						</button>
					</div>
				</div>
			)}

			<form onSubmit={handleSendMessage} className="flex items-center gap-2">
				<div className="flex-1 flex gap-2">
					<input
						type="text"
						className="w-full input input-primary rounded-lg input-sm sm:input-md"
						placeholder="Type a message..."
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<input
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={handleImageChange}
					/>
					<button
						type="button" className={`btn btn-circle ${imagePreview ? "text-primary" : "text-base-content/30"}`}
						onClick={() => fileInputRef.current?.click()} >
						<Image size={20} />
					</button>
				</div>
				<button type="submit" className="btn btn-primary btn-circle" disabled={!text.trim() && !imagePreview} >
					<Send size={20} />
				</button>
			</form>
		</div>
	);
};

export default MessageInput;