import { formatMessageTime } from "../../lib/utils/formatMessageTime";
import MessageInputContainer from "../MessageInput/MessageInputContainer";
import ChatHeaderContainer from "../ChatHeader/ChatHeaderContainer";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { Trash } from "lucide-react";

const Chat = ({
  isMessagesLoading,
  messages,
  messageEndRef,
  selectedUser,
  authUser,
  deleteMessage,
}) => {
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeaderContainer />
        <MessageSkeleton />
        <MessageInputContainer />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeaderContainer />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat group ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 flex">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
              
              {message.senderId === authUser._id && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteMessage(message._id)}>
                  <Trash
                    className="cursor-pointer text-red-500 hover:text-red-600"
                    size={15}
                  />
                </div>
              )}
            </div>
            <div className="chat-bubble flex flex-col relative">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInputContainer />
    </div>
  );
};
export default Chat;
