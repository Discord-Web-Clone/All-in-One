import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  background-color: var(--Surface-40);
  outline: 1px solid var(--Stroke-10);
`;

export const ChannelNav = styled.div`
  height: 100%;
  width: 304px;
  background-color: var(--Surface-50);
  gap: 20px;
`;

export const Header = styled.div`
  padding: 14px 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px var(--Stroke-10) solid;
`;

export const Body = styled.div`
  padding: 22px 8px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Channel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  padding: 0px 8px;
  color: var(--Text-20);
`;

export const ChannelBox = styled.h2`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  padding: 6px 8px;
  background-color: null;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--Stroke-10);
  }
`;

export const ChannelName = styled(ChannelBox)<{ isClicked?: boolean }>`
  background-color: ${({ isClicked }) =>
    isClicked ? "var(--Surface-10)" : "transparent"};
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ isClicked }) =>
      isClicked ? "var(--Surface-10)" : "var(--Stroke-10)"};
  }
`;

export const VoiceChannelName = ChannelBox;

export const Icon = styled.span`
  font-family: "Material Symbols Outlined";
  font-weight: 200;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  font-variation-settings: "FILL" 1;
`;
