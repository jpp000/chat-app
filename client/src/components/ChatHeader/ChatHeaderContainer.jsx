import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "./ChatHeader";

const ChatHeaderContainer = () => { 
    const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
    
        return (
            <ChatHeader
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                onlineUsers={onlineUsers}
            />
        );
}

export default ChatHeaderContainer;