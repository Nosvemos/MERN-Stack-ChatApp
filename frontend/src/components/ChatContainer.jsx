import {useEffect, useRef} from "react";

import { useChatStore } from "../store/useChatStore.js";
import {useAuthStore} from "../store/useAuthStore.js";

import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";

import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";

import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
	const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null);

	useEffect(() => {
		getMessages(selectedUser._id);
		subscribeToMessages();
		return () => unsubscribeFromMessages();
	}, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

	useEffect(() => {
		if (messageEndRef.current && messages) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	if(isMessagesLoading) {
		return (
			<div className="flex-1 flex flex-col overflow-auto">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div className='flex-1 flex flex-col overflow-auto'>
			<ChatHeader/>
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map((message) => (
					<div key={message._id}
						className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
						ref={messageEndRef}>
						<div className="chat-image avatar">
							<div className="size-10 rounded-full border border-primary">
								<img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile pic"/>
							</div>
						</div>
						<div className="chat-header mb-1">
							<time className="text-xs text-primary ml-1">
								{formatMessageTime(message.createdAt)}
							</time>
						</div>
						<div className={`chat-bubble rounded-xl flex flex-col ${message.senderId === authUser._id ? "bg-primary" : "bg-base-200"}`}>
							{message.image && (
								<img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2 mt-1"/>
							)}
							{message.text && <p className={`${message.senderId === authUser._id ? "text-primary-content/100" : "text-base-content/100"}`}>{message.text}</p>}
						</div>
					</div>
				))}
				{messages.length <= 0 &&
					<div className="flex items-center justify-center">
						<span className={'text-primary mt-10'}>No messages found before.</span>
					</div>
				}
			</div>
			<MessageInput/>
		</div>
	);
};

export default ChatContainer;