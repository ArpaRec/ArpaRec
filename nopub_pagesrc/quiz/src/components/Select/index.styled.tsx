import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
`;

export const SelectField = styled.button`
  border: 1px solid ${(props) => props.theme.grayOne};
  background: transparent;
  border-radius: 8px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 54px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  gap: 24px;

  &:focus {
    outline: 2px solid ${(props) => props.theme.violet};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const SelectText = styled.p`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;

export const IconContainer = styled.div`
  user-select: none;
  img {
    pointer-events: none;
    display: block;
  }
`;

interface OptionsListProps {
  /** If true, displays the options list at the top of select. Otherwise at the bottom */
  displayTop?: boolean;
}

export const OptionsList = styled.ul<OptionsListProps>`
  padding: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: calc(55px * 5 - 5px);
  overflow: auto;
  border-radius: 8px;
  box-shadow: 0 0 4px rgb(0 0 0 / 0.25);
  background: ${(props) => props.theme.whiteOne};

  ${(props) => (props.displayTop ? `bottom: calc(100% + 8px);` : `margin-top: 8px;`)}

  // https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.paleViolet};
    border-radius: 4px;
  }
`;

export const ListOption = styled.li`
  padding: 8px 24px;
  min-height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;

  :active,
  :focus,
  :hover,
  [aria-selected="true"] {
    background: ${(props) => props.theme.paleViolet};
  }
`;
