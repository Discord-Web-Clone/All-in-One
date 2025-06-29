import { createContext, useContext, ReactNode } from "react";
import { useSocket } from "./useSocket";

interface SocketContextType {
  socket: any; // Socket.io-client type
  userId: string | null;
  isConnected: boolean;
  onlineUsers: string[];
  allUsers: string[];
  connectUser: (userId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, userId, isConnected, onlineUsers, allUsers, connectUser } =
    useSocket();

  return (
    <SocketContext.Provider
      value={{
        socket,
        userId,
        isConnected,
        onlineUsers,
        allUsers,
        connectUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
