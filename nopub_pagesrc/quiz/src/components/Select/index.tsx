import type { SelectProps, IOption } from "./index.types";
import { useState } from "react";
import {
  ListOption,
  SelectText,
  OptionsList,
  SelectField,
  IconContainer,
  SelectContainer,
} from "./index.styled";
import Icons from "../../styles/Icons";
import OutsideClickHandler from "react-outside-click-handler";

// Component code is based on:
// https://codepen.io/tcomdev/pen/WNXeqoG

const Select = ({ optionsList, value, changeHandler, displayTop }: SelectProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  const setSelectedThenCloseDropdown = (option: IOption) => {
    changeHandler(option);
    setIsOptionsOpen(false);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsOptionsOpen(false);
      }}
    >
      <SelectContainer style={{ position: "relative" }}>
        <SelectField type="button" onClick={toggleOptions}>
          <SelectText>{value.text}</SelectText>{" "}
          <IconContainer>{Icons.selectIcon_24px}</IconContainer>
        </SelectField>
        {isOptionsOpen && (
          <OptionsList tabIndex={-1} displayTop={displayTop}>
            {optionsList.map((option: any) => (
              <ListOption
                key={option.id}
                aria-selected={value.id === option.id}
                tabIndex={0}
                onClick={() => setSelectedThenCloseDropdown(option)}
              >
                {option.text}
              </ListOption>
            ))}
          </OptionsList>
        )}
      </SelectContainer>
    </OutsideClickHandler>
  );
};

export default Select;
