import styled from "styled-components";

interface StyledButtonProps {
  /** If true button is disabled */
  disabled?: boolean;
  /** If true button is secondary. Transparent background and border */
  secondary?: boolean;
  /** If true button is large */
  large?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  background: ${({ theme }) => theme.violet};
  color: ${({ theme }) => theme.whiteOne};
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
  font-weight: 700;
  line-height: 100%;
  max-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid ${(props) => props.theme.violet};
    outline-offset: 2px;
  }

  ${(props) => {
    if (props.disabled !== true)
      return `
        &:hover {
          scale: 1.05;
          translate: 0px -2px;
        }

        &:active {
          scale: 0.95;
        }
      `;
    if (props.disabled === true) {
      return `
        opacity: 0.5;
        cursor: not-allowed;
      `;
    }
  }}

  ${(props) => {
    if (props.secondary === true) {
      return `
        background: transparent;
        border: 1px solid ${props.theme.violet};
        color: ${props.theme.violet};
      `;
    }
  }}

${(props) => {
    if (props.large === true) {
      return `
        font-size: 24px;
        padding: 24px 36px;
        border-radius: 16px;
        max-height: 80px;
      `;
    }
  }}
`;
