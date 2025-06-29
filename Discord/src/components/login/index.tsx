/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useSocketContext } from "../../hooks/SocketProvider";

const Container = styled.div`
  background: var(--Surface-20);
  border: 1px solid var(--Stroke-10);
  padding: 24px;
  border-radius: 12px;
  flex: 1;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  font-size: 32px;
  color: var(--Text-10);
  margin-bottom: 16px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 60%;
  font-size: 16px;
  padding: 16px 16px;
  margin-bottom: 12px;
  background: var(--Surface-30);
  border: 1px solid var(--Stroke-10);
  color: var(--Text-10);
  border-radius: 8px;

  &::placeholder {
    color: var(--Text-20);
  }
`;

const Button = styled.button`
  width: 60%;
  box-sizing: border-box;
  padding: 16px;
  background-color: var(--Blue-10);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }
`;

const Status = styled.p`
  margin-top: 16px;
  color: var(--Text-20);
  text-align: center;
`;

export const Auth = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { socket, userId, isConnected, connectUser } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleLoginSuccess = ({
      userId: loggedInUserId,
    }: {
      userId: string;
    }) => {
      console.log(`✅ 로그인 성공: ${loggedInUserId}`);
      setIsLoggedIn(true);
      setInputUserId("");
    };

    const handleError = (msg: string) => {
      alert(`❌ ${msg}`);
    };

    socket.on("loginSuccess", handleLoginSuccess);
    socket.on("error", handleError);

    return () => {
      socket.off("loginSuccess", handleLoginSuccess);
      socket.off("error", handleError);
    };
  }, [socket]);

  const handleLogin = () => {
    if (!inputUserId.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!socket) {
      alert("소켓 연결이 되지 않았습니다.");
      return;
    }

    console.log(`🔑 로그인 시도: ${inputUserId}`);
    connectUser(inputUserId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (socket) {
      socket.emit("userDisconnected", userId);
    }
  };

  return (
    <Container>
      <Title>🧑‍💻 채팅 로그인</Title>
      {!isLoggedIn ? (
        <>
          <Input
            placeholder="User ID 입력"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleLogin}>로그인</Button>
          <Status>
            연결 상태: {isConnected ? "🟢 연결됨" : "🔴 연결 중..."}
          </Status>
        </>
      ) : (
        <>
          <Status>🔓 로그인됨: {userId}</Status>
          <Button onClick={handleLogout} css={{ marginTop: "16px" }}>
            로그아웃
          </Button>
        </>
      )}
    </Container>
  );
};
