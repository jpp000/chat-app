import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "./Sidebar";

const SidebarContainer = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    return (
        <Sidebar
            isUsersLoading={isUsersLoading}
            onlineUsers={onlineUsers}
            showOnlineOnly={showOnlineOnly}
            setShowOnlineOnly={setShowOnlineOnly}
            filteredUsers={filteredUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
        />
    );
}

export default SidebarContainer;
