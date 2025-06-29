import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

export const useSocket = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("⚡ Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      setIsConnected(false);
    });

    // User-related event handlers
    socket.on("loginSuccess", ({ userId }: { userId: string }) => {
      console.log("✅ Login success, user ID:", userId);
      setUserId(userId);
    });

    socket.on("onlineUsers", (users: string[]) => {
      console.log("👥 Online users updated:", users);
      setOnlineUsers(users);
    });

    socket.on("allUsers", (users: string[]) => {
      console.log("📋 All users updated:", users);
      setAllUsers(users);
    });

    socket.on("error", (errorMessage: string) => {
      console.error("🚨 Socket error:", errorMessage);
      alert(errorMessage);
    });

    return () => {
      console.log("🧹 Cleaning up socket connection");
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Function to get the socket instance
  const getSocket = () => socketRef.current;

  // Function to manually connect a user
  const connectUser = (newUserId: string) => {
    if (!newUserId || newUserId.trim() === "") {
      console.error("❌ Invalid user ID");
      return;
    }

    localStorage.setItem("userId", newUserId);
    setUserId(newUserId);

    if (socketRef.current) {
      socketRef.current.emit("userConnected", newUserId);
    }
  };

  return {
    socket: socketRef.current,
    onlineUsers,
    userId,
    allUsers,
    isConnected,
    getSocket,
    connectUser,
  };
};
