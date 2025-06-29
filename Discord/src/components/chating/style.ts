import styled from "@emotion/styled";

// 타입 정의
interface ConnectionStatusProps {
  connected: boolean;
}

interface ChatMessageProps {
  showHeader: boolean;
}

interface UsernameProps {
  isMe: boolean;
}

interface MessageTextProps {
  showHeader: boolean;
}

export const Container = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Header = styled.div`
  position: fixed;
  top: 32px;
  display: flex;
  gap: 4px;
  padding: 14px 26px;
  border-bottom: 1px var(--Stroke-10) solid;
  width: 100%;
  box-sizing: border-box;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-sizing: border-box;
  justify-content: flex-end;
  gap: 32px;
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BottomBar = styled.div`
  padding: 0 8px;
  background-color: var(--Surface-40);
`;

export const ChattingBar = styled.div`
  width: 100%;
  display: flex;
  padding: 18px;
  box-sizing: border-box;
  background-color: var(--Surface-30);
  border-radius: 8px;
  outline: 1px solid var(--Stroke-10);
  outline-offset: -1px;
  margin-top: -4px;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  all: unset;
  font-size: 16px;
  line-height: 18px;
  width: 100%;
`;

export const ChannelProfile = styled.span`
  font-family: Material Symbols Rounded;
  font-weight: 400;
  font-style: normal;
  font-size: 52px;
  line-height: 1;
  padding: 8px;
  color: var(--Icon-10);
  background-color: #393a41;
  border-radius: 100%;
  width: fit-content;
`;

export const WelcomeMessage = styled.h1`
  font-size: 32px;
  line-height: 36px;
  font-weight: 700;
`;

export const SubWelcomeMessage = styled.h3`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

export const Tittle = styled.h1`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  align-self: center;
`;

export const Icon = styled.span`
  font-family: "Material Symbols Outlined";
  font-weight: 300;
  font-style: normal;
  font-size: 26px;
  line-height: 20px;
  color: var(--Icon-20);
  font-variation-settings: "FILL" 1;
`;

export const ChattingBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
`;

export const BodyBox = styled.div`
  display: flex;
  flex: 1;
  margin-top: 49px;
`;

// 채팅 메시지 컨테이너
export const Chats = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
`;

// 개별 채팅 메시지
export const ChatMessage = styled.div<ChatMessageProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: ${(props) => (props.showHeader ? "0" : "0")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

// 메시지 헤더 (사용자명 + 시간)
export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
`;

// 사용자명
export const Username = styled.span<UsernameProps>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.isMe ? "#00d4ff" : "#ffffff")};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 타임스탬프
export const Timestamp = styled.span`
  font-size: 12px;
  color: #b9bbbe;
  font-weight: 400;
`;

// 메시지 텍스트
export const MessageText = styled.div<MessageTextProps>`
  font-size: 14px;
  line-height: 1.4;
  color: #dcddde;
  word-wrap: break-word;
  margin-left: ${(props) => (props.showHeader ? "0" : "0")};
  margin-top: ${(props) => (props.showHeader ? "0" : "-2px")};
  padding: 4px 0;

  /* 링크 스타일 */
  a {
    color: #00b0f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// 연결 상태 표시
export const ConnectionStatus = styled.div<ConnectionStatusProps>`
  font-size: 12px;
  color: ${(props) => (props.connected ? "#43b581" : "#f04747")};
  margin-left: auto;
  font-weight: 500;
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  opacity: 0.5;
  margin-left: 8px;
  padding: 2px;
  border-radius: 2px;

  &:hover {
    opacity: 1;
    background-color: rgba(240, 71, 71, 0.1);
  }
`;

// 타이핑 인디케이터
export const TypingIndicator = styled.div`
  font-size: 12px;
  color: #b9bbbe;
  font-style: italic;
  padding: 4px 0;
  opacity: 0.7;
`;

export const Message = styled.div`
  display: flex;
  padding: 16px;
`;
