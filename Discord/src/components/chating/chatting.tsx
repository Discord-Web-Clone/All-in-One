import { Member } from "../member";
import { useState, useEffect, useRef } from "react";
import { useSocketContext } from "../../hooks/SocketProvider";
import * as _ from "./style";
import { ProfileImg } from "../../assets/Profile/img";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: number;
  channel: string;
}

const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use the socket from the context
  const { socket, userId, isConnected } = useSocketContext();

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours % 12 || 12;

    return `${year}. ${month}. ${day} (${period}) ${displayHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const shouldShowHeader = (
    currentMessage: Message,
    prevMessage: Message | null
  ) => {
    if (!prevMessage) return true;
    if (currentMessage.user !== prevMessage.user) return true;

    // 5분 이내면 헤더 숨김
    const timeDiff = currentMessage.timestamp - prevMessage.timestamp;
    return timeDiff > 5 * 60 * 1000; // 5분 = 300000ms
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket) return;

    // 채팅 히스토리 수신
    const handleChatHistory = (history: Message[]) => {
      console.log("📜 Chat history received:", history.length, "messages");
      setMessages(history);
    };

    // 새 메시지 수신
    const handleNewMessage = (message: Message) => {
      console.log("💬 New message received:", message);
      setMessages((prev) => [...prev, message]);
    };

    // 메시지 삭제
    const handleMessageDeleted = (messageId: string) => {
      console.log("🗑️ Message deleted:", messageId);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    // 타이핑 상태 수신
    const handleUserTyping = ({
      userId: typingUserId,
      isTyping,
      channel,
    }: {
      userId: string;
      isTyping: boolean;
      channel: string;
    }) => {
      if (channel === "Normal" || channel === "all") {
        setTypingUsers((prev) => {
          if (isTyping) {
            return [...prev.filter((id) => id !== typingUserId), typingUserId];
          } else {
            return prev.filter((id) => id !== typingUserId);
          }
        });
      }
    };

    // 에러 처리
    const handleError = (errorMessage: string) => {
      console.error("🚨 Socket error:", errorMessage);
      alert(errorMessage);
    };

    // Event listeners 등록
    socket.on("chatHistory", handleChatHistory);
    socket.on("newMessage", handleNewMessage);
    socket.on("messageDeleted", handleMessageDeleted);
    socket.on("userTyping", handleUserTyping);
    socket.on("error", handleError);

    // 컴포넌트가 마운트되면 채팅 히스토리 요청
    if (isConnected) {
      console.log("🔄 Requesting chat history...");
      // 서버에서 자동으로 chatHistory를 보내주므로 별도 요청 불필요
    }

    // Cleanup
    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("newMessage", handleNewMessage);
      socket.off("messageDeleted", handleMessageDeleted);
      socket.off("userTyping", handleUserTyping);
      socket.off("error", handleError);
    };
  }, [socket, isConnected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendTypingStatus = (isTyping: boolean) => {
    if (socket && userId && isConnected) {
      socket.emit("typing", { isTyping, channel: "Normal" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() &&
      isConnected &&
      userId &&
      socket
    ) {
      console.log("📤 Sending message:", inputValue.trim());

      // 메시지 전송
      socket.emit("sendMessage", {
        text: inputValue.trim(),
        channel: "Normal",
      });

      setInputValue("");

      // 타이핑 상태 해제
      sendTypingStatus(false);

      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 타이핑 상태 전송
    if (e.target.value.trim() && isConnected && userId) {
      sendTypingStatus(true);

      // Set timeout to stop typing after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(false);
      }, 3000);
    } else {
      sendTypingStatus(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (socket && isConnected) {
      console.log("🗑️ Deleting message:", messageId);
      socket.emit("deleteMessage", messageId);
    }
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // 사용자가 연결되지 않은 경우 로그인 안내
  if (!userId) {
    return (
      <_.Container>
        <_.Header>
          <_.Icon>numbers</_.Icon>
          <_.Tittle>Normal</_.Tittle>
          <_.ConnectionStatus connected={false}>
            🔴 로그인 필요
          </_.ConnectionStatus>
        </_.Header>
        <_.BodyBox>
          <_.ChattingBox>
            <_.Body>
              <_.Welcome>
                <_.ChannelProfile>numbers</_.ChannelProfile>
                <_.WelcomeMessage>로그인이 필요합니다</_.WelcomeMessage>
                <_.SubWelcomeMessage>
                  채팅을 사용하려면 먼저 로그인해주세요.
                </_.SubWelcomeMessage>
              </_.Welcome>
            </_.Body>
          </_.ChattingBox>
          <Member />
        </_.BodyBox>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.Header>
        <_.Icon>numbers</_.Icon>
        <_.Tittle>Normal</_.Tittle>
        <_.ConnectionStatus connected={isConnected}>
          {isConnected ? "🟢 연결됨" : "🔴 연결 끊김"}
        </_.ConnectionStatus>
      </_.Header>

      <_.BodyBox>
        <_.ChattingBox>
          <_.Body>
            <_.Welcome>
              <_.ChannelProfile>numbers</_.ChannelProfile>
              <_.WelcomeMessage>Welcome to #Normal</_.WelcomeMessage>
              <_.SubWelcomeMessage>
                This is the start of the #Normal channel.
              </_.SubWelcomeMessage>
            </_.Welcome>

            {/* 채팅 메시지들 */}
            <_.Message>
              <_.Chats>
                {messages.map((message, index) => {
                  const prevMessage = index > 0 ? messages[index - 1] : null;
                  const showHeader = shouldShowHeader(message, prevMessage);
                  const isMyMessage = message.user === userId;

                  return (
                    <_.ChatMessage key={message.id} showHeader={showHeader}>
                      {showHeader && (
                        <_.MessageHeader>
                          <_.Username isMe={isMyMessage}>
                            {message.user}
                            {isMyMessage && " (나)"}
                          </_.Username>
                          <_.Timestamp>
                            {formatDateTime(message.timestamp)}
                          </_.Timestamp>
                          {isMyMessage && (
                            <_.DeleteButton
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              🗑️
                            </_.DeleteButton>
                          )}
                        </_.MessageHeader>
                      )}
                      <_.MessageText showHeader={showHeader}>
                        {message.text}
                      </_.MessageText>
                    </_.ChatMessage>
                  );
                })}

                {/* 타이핑 인디케이터 */}
                {typingUsers.length > 0 && (
                  <_.TypingIndicator>
                    {typingUsers.join(", ")}님이 입력 중...
                  </_.TypingIndicator>
                )}

                <div ref={messagesEndRef} />
              </_.Chats>
            </_.Message>
          </_.Body>

          <_.BottomBar>
            <_.ChattingBar>
              <_.Input
                placeholder={
                  isConnected ? "Send a message to #Normal" : "연결 중..."
                }
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
              />
            </_.ChattingBar>
          </_.BottomBar>
        </_.ChattingBox>

        <Member />
      </_.BodyBox>
    </_.Container>
  );
};

export default Chatting;
