import styled from "styled-components";

export const MegaHeader = styled.h1`
  color: ${(props) => props.theme.violet};
  font-size: 80px;
  font-weight: 900;
`;

export const MegaHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: min(400px, 100% - 8px * 2);
`;
