import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { SOCKET_EVENTS } from "../../../common/constants/events";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: true,
  isMessagesLoading: true,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users/list-contacts");

      set({ users: res.data.contacts });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (recipiendId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${recipiendId}`);

      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket.on(SOCKET_EVENTS.MESSAGE_CREATE, (messageData) => {
      const isMessageSentFromSelectedUser =
        messageData.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, messageData],
      });
    });

    socket.on(SOCKET_EVENTS.MESSAGE_DELETED, (messageId) => {
      const { messages } = get();

      const updatedMessages = messages.filter(
        (message) => message._id !== messageId
      );

      set({ messages: updatedMessages });
    })
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();

    if (!socket) return;

    socket.off(SOCKET_EVENTS.MESSAGE_CREATE);
    socket.off(SOCKET_EVENTS.MESSAGE_DELETED);
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        {
          messageData: {
            text: messageData?.text,
            image: messageData?.image,
          },
        }
      );

      set({
        messages: [...messages, res.data.message],
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  deleteMessage: async (messageId) => {
    const { messages } = get();

    try {      
      await axiosInstance.delete(`/messages/${messageId}`);

      const updatedMessages = messages.filter(
        (message) => message._id !== messageId
      );

      set({ messages: updatedMessages });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
