import styled from "@emotion/styled";

export const Container = styled.div`
  width: 264px;
  outline: 1px var(--Stroke-10) solid;
  outline-offset: -1px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserState = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: var(--Text-20);
  padding: 0 8px;
`;

export const Onlines = UserState;
export const Offlines = UserState;

export const OnlinePerson = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  line-height: 20px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--Text-10);

  &:hover {
    background-color: var(--Surface-30);
  }
`;
