import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { ENV } from "../constants/env";
import { SOCKET_EVENTS } from "../../../common/constants/events";

const baseUrl = ENV.BASE_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  token: null,

  checkAuth: async (token) => {
    try {
      const res = await axiosInstance.get("/auth/check");

      if (res.data?.user) {
        set({ authUser: res.data.user });
      }

      set({ token });
      get().connectSocket();
    } catch (err) {
      console.log("Error in auth check:", err);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully");

      set({ authUser: res.data.user });

      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      toast.success("Logged in successfully");

      set({ authUser: res.data.user });

      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      get().disconnectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/users/profile-picture", {
        profilePicture: data.profilePicture,
      });
      toast.success("Profile updated successfully");

      set({ authUser: res.data.user });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, token } = get();

    if (!authUser || get().socket?.connected || !token) return;

    const socket = io(baseUrl, {
      query: {
        token,
      },
    });

    socket.connect();

    set({ socket });

    socket.on(SOCKET_EVENTS.ONLINE_USERS, (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
