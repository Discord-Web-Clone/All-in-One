import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  display: flex;
  width: 360px;
  box-sizing: border-box;
  background-color: var(--Surface-20);
  border-radius: 8px;
  bottom: 8px;
  left: 8px;
  outline: 1px solid var(--Stroke-10);
  outline-offset: -1px;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const User = styled.div`
  gap: 8px;
  display: flex;
`;

export const TextBox = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.h1`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;

export const OnlineState = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
`;

export const Icons = styled.div`
  display: flex;
  gap: 8px;
`;

export const Icon = styled.span`
  font-family: "Material Symbols Rounded";
  font-weight: 400;
  font-style: normal;
  line-height: 1;
  font-variation-settings: "FILL" 1;
`;
