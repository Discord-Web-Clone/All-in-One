import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const DMIcon = styled.img`
  width: 24px;
`;

export const ChannelBox = styled.div`
  background-color: var(--Selected);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--Blue-10);
  }
`;

export const Line = styled.div`
  width: 32px;
  height: 1px;
  background-color: var(--Stroke-10);
`;
