import styled from "styled-components";

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalContent = styled.section`
  width: min(420px, 100% - 8px * 2);
  background: ${(props) => props.theme.whiteOne};
  box-shadow: 0 0 4px rgb(0 0 0 / 0.25), 0 4px 4px rgb(0 0 0 / 0.25);
  border-radius: 8px;
  overflow: auto;
  max-height: 95%;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.header`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

export const H1 = styled.h1`
  text-transform: uppercase;
  color: ${(props) => props.theme.violet};
  font-size: 24px;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const Close = styled.div`
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  transition: 0.3s linear;
  user-select: none;

  &:hover {
    background: ${(props) => props.theme.paleViolet};
  }

  img {
    display: block;
  }
`;

export const Hr = styled.hr`
  border: 0.5px solid ${(props) => props.theme.paleViolet};
`;

export const ButtonContainer = styled.footer`
  display: flex;
  padding: 16px 24px;
  gap: 24px;

  * {
    flex: 1;
  }
`;

export const ModalBody = styled.main`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  flex: 1;

  // https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.whiteOne};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.paleViolet};
    border-radius: 4px;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  letter-spacing: 2px;
  color: ${(props) => props.theme.violet};
  text-transform: uppercase;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TextField = styled.input`
  border: 1px solid ${(props) => props.theme.grayOne};
  border-radius: 8px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 54px;
  font-size: 16px;

  outline-color: ${(props) => props.theme.violet};
  outline-width: 2px;
  outline-offset: 2px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const Caption = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.grayOne};
`;
