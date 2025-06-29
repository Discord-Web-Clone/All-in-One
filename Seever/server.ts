import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

app.use(cors());

// 사용자 및 채팅 관련 데이터
const allUsers: string[] = [];
const onlineUsers = new Set<string>();
const chatMessages: Array<{
  id: string;
  text: string;
  user: string;
  timestamp: number;
  channel: string;
}> = [];

io.on("connection", (socket) => {
  console.log(`🔌 새 클라이언트 연결됨: ${socket.id}`);

  socket.on("userConnected", (userId: string) => {
    console.log(`📨 사용자 연결 요청: ${userId}`);

    // 🔐 간단한 인증 처리
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      socket.emit("error", "❌ 유효하지 않은 사용자 ID입니다.");
      socket.disconnect();
      return;
    }

    // 이미 이 소켓이 인증되어 있다면 중복 요청 무시
    if ((socket as any).userId) {
      console.log(`⚠️ 소켓 ${socket.id}의 중복 인증 요청 무시`);
      return;
    }

    if (!allUsers.includes(userId)) {
      allUsers.push(userId);
    }

    onlineUsers.add(userId);
    (socket as any).userId = userId;

    // Emit loginSuccess to match client expectation
    socket.emit("loginSuccess", { userId });
    io.emit("onlineUsers", Array.from(onlineUsers));
    io.emit("allUsers", allUsers);

    socket.emit("chatHistory", chatMessages);

    console.log(`✅ 사용자 ${userId} 연결 완료`);
    console.log("현재 온라인 사용자:", Array.from(onlineUsers));
  });

  socket.on("sendMessage", (messageData: { text: string; channel: string }) => {
    const userId = (socket as any).userId;

    if (!userId) {
      socket.emit("error", "❌ 인증되지 않은 사용자입니다.");
      return;
    }

    const message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: messageData.text,
      user: userId,
      timestamp: Date.now(),
      channel: messageData.channel || "Normal",
    };

    chatMessages.push(message);
    io.emit("newMessage", message);

    console.log(
      `${userId}님이 #${message.channel}에 메시지 전송: ${message.text}`
    );
  });

  socket.on("typing", (data: { isTyping: boolean; channel: string }) => {
    const userId = (socket as any).userId;
    if (userId) {
      socket.broadcast.emit("userTyping", {
        userId,
        isTyping: data.isTyping,
        channel: data.channel,
      });
    }
  });

  socket.on("getChannelHistory", (channel: string) => {
    const channelMessages = chatMessages.filter(
      (msg) => msg.channel === channel
    );
    socket.emit("channelHistory", { channel, messages: channelMessages });
  });

  socket.on("deleteMessage", (messageId: string) => {
    const userId = (socket as any).userId;
    const messageIndex = chatMessages.findIndex(
      (msg) => msg.id === messageId && msg.user === userId
    );

    if (messageIndex !== -1) {
      chatMessages.splice(messageIndex, 1);
      io.emit("messageDeleted", messageId);
      console.log(`🗑️ 메시지 ${messageId} 삭제됨`);
    } else {
      socket.emit("error", "❌ 메시지를 삭제할 권한이 없습니다.");
    }
  });

  socket.on("userDisconnected", (userId: string) => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers));
      io.emit("allUsers", allUsers);

      socket.broadcast.emit("userTyping", {
        userId,
        isTyping: false,
        channel: "all",
      });

      console.log(`⛔ 사용자 ${userId} 로그아웃`);
      console.log("현재 온라인 사용자:", Array.from(onlineUsers));
    }
  });

  socket.on("disconnect", () => {
    const userId = (socket as any).userId;
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers));
      io.emit("allUsers", allUsers);

      socket.broadcast.emit("userTyping", {
        userId,
        isTyping: false,
        channel: "all",
      });

      console.log(`⛔ 사용자 ${userId} 연결 해제됨`);
      console.log("현재 온라인 사용자:", Array.from(onlineUsers));
    }
  });
});

const PORT = 5001;
httpServer.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
