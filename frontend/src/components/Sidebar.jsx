import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";

const Sidebar = () => {
	const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
	const onlineUsers = [];

	useEffect(() => {
		getUsers();
	}, [getUsers])

	if(isUsersLoading) {
		
	}
	return (
		<div>Sidebar</div>
	);
};

export default Sidebar;